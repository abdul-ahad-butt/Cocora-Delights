import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';
import { categories, products, signatureCollections, orders, newsletterSubscribers } from './db/schema';
import { eq } from 'drizzle-orm';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for all routes (important for frontend communication)
app.use('/api/*', cors({
  origin: '*', // In production, restrict to frontend domain
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  // credentials: true, // Removed because wildcard origin ('*') cannot be used with credentials
}));

// Test root endpoint
app.get('/', (c) => {
  return c.json({ message: 'Welcome to Cocora Chocolate Boutique API' });
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

export default app;
