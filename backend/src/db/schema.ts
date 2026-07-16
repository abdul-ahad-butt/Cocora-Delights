import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url')
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').references(() => categories.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: real('price').notNull(), // Price per single piece
  imageUrl: text('image_url'),
  shape: text('shape'), // 'heart', 'cube', 'bar', 'letter', 'number', 'custom'
  fillings: text('fillings'), // comma-separated or JSON list of fillings (e.g., 'almond', 'pistachio', 'date')
  ingredients: text('ingredients'),
  nutritionalInfo: text('nutritional_info'),
  inStock: integer('in_stock', { mode: 'boolean' }).notNull().default(true)
});

export const signatureCollections = sqliteTable('signature_collections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: real('price').notNull(),
  imageUrl: text('image_url'),
  pieces: integer('pieces').notNull(), // e.g. 9, 16, 25
  occasion: text('occasion'), // 'eid', 'ramadan', 'wedding', 'birthday', etc.
  inStock: integer('in_stock', { mode: 'boolean' }).notNull().default(true)
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(), // Generated client-side or server-side ID
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  shippingAddress: text('shipping_address').notNull(),
  shippingCity: text('shipping_city').notNull(),
  shippingCountry: text('shipping_country').notNull(),
  orderType: text('order_type').notNull(), // 'custom_box' or 'signature_collection'
  customBoxDetails: text('custom_box_details'), // JSON structure: { boxSize: 9|16|25, boxColor: string, chocolates: [{position: number, productId: number, filling: string}], giftMessage: string }
  signatureCollectionId: integer('signature_collection_id').references(() => signatureCollections.id),
  quantity: integer('quantity').notNull().default(1),
  totalPrice: real('total_price').notNull(),
  paymentMethod: text('payment_method').notNull(), // 'card', 'whatsapp', 'cod'
  orderStatus: text('order_status').notNull().default('pending'),
  createdAt: text('created_at').notNull()
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').notNull()
});
