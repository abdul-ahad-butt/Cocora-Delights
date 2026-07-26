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
  id: text('id').primaryKey(),
  clientName: text('client_name'),
  orderType: text('order_type'),
  city: text('city'),
  country: text('country'),
  totalValue: text('total_value'),
  items: text('items'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').notNull()
});
