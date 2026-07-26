import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/d1';
import { categories, products, signatureCollections, orders, newsletterSubscribers } from './db/schema';
import { eq, desc } from 'drizzle-orm';

type Bindings = {
  DB: D1Database;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS globally for all routes — covers both storefront & admin panel domains
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
}));

// Test root endpoint
app.get('/', (c) => {
  return c.json({ message: 'Welcome to Cocora Chocolate Boutique API' });
});

// Silence favicon.ico 404 errors in browser
app.get('/favicon.ico', (c) => {
  return c.body(null, 204);
});

// GET all categories
app.get('/api/categories', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const results = await db.select().from(categories).all();
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET all products (chocolate pieces)
app.get('/api/products', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const results = await db.select().from(products).all();
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET all signature collections
app.get('/api/signature-collections', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const results = await db.select().from(signatureCollections).all();
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST newsletter subscription
app.post('/api/newsletter', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    if (!email || !email.includes('@')) {
      return c.json({ success: false, error: 'Invalid email address' }, 400);
    }

    const db = drizzle(c.env.DB);
    await db.insert(newsletterSubscribers).values({
      email,
      createdAt: new Date().toISOString(),
    }).onConflictDoNothing(); // If already subscribed, don't fail

    return c.json({ success: true, message: 'Successfully subscribed to Cocora Circle' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST place order
app.post('/api/orders', async (c) => {
  try {
    const body = await c.req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      orderType,
      customBoxDetails,
      signatureCollectionId,
      quantity,
      totalPrice,
      paymentMethod,
    } = body;

    // Validate fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !shippingCity || !shippingCountry || !orderType || !totalPrice || !paymentMethod) {
      return c.json({ success: false, error: 'Missing required shipping or order details' }, 400);
    }

    const orderId = 'COC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const db = drizzle(c.env.DB);

    await db.insert(orders).values({
      id: orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      orderType,
      customBoxDetails: customBoxDetails ? JSON.stringify(customBoxDetails) : null,
      signatureCollectionId: signatureCollectionId ? Number(signatureCollectionId) : null,
      quantity: quantity ? Number(quantity) : 1,
      totalPrice: Number(totalPrice),
      paymentMethod,
      orderStatus: 'pending',
      createdAt: new Date().toISOString(),
    });

    return c.json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        totalPrice,
        customerName,
      }
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST admin login
app.post('/api/admin/login', async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    const expectedUsername = c.env.ADMIN_USERNAME || 'Admin123';
    const expectedPassword = c.env.ADMIN_PASSWORD || 'Cocora-@#Delights';
    const jwtSecret = c.env.JWT_SECRET || 'fallback_secret';

    if (username === expectedUsername && password === expectedPassword) {
      const payload = {
        username: username,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours expiry
      };
      const token = await sign(payload, jwtSecret);
      return c.json({ success: true, token });
    }

    return c.json({ success: false, error: 'Invalid credentials' }, 401);
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET admin orders
app.get('/api/admin/orders', async (c) => {
  try {
    // Basic JWT verification
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    const jwtSecret = c.env.JWT_SECRET || 'fallback_secret';
    
    try {
      await verify(token, jwtSecret, "HS256");
    } catch (e) {
      return c.json({ success: false, error: 'Invalid or expired token' }, 401);
    }

    const db = drizzle(c.env.DB);
    // Fetch all orders ordered by latest first
    const results = await db.select().from(orders).orderBy(desc(orders.createdAt)).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
