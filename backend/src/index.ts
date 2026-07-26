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
      orderId,
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
      orderStatus
    } = body;

    const query = `
      INSERT INTO orders (
        id, customer_name, customer_email, customer_phone,
        shipping_address, shipping_city, shipping_country,
        order_type, custom_box_details, signature_collection_id,
        quantity, total_price, payment_method, order_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const finalOrderId = orderId || 'COC-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    await c.env.DB.prepare(query).bind(
      finalOrderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      orderType,
      typeof customBoxDetails === 'object' ? JSON.stringify(customBoxDetails) : customBoxDetails || null,
      signatureCollectionId || null,
      quantity || 1,
      totalPrice,
      paymentMethod,
      orderStatus || 'pending',
      new Date().toISOString()
    ).run();

    return c.json({
      success: true,
      id: finalOrderId,
      message: 'Order created successfully',
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message, stack: error.stack }, 500);
  }
});

// GET all orders for Admin Panel (unauthenticated as requested by diagnostic prompt)
app.get('/api/orders', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const results = await db.select().from(orders).orderBy(desc(orders.createdAt)).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
