-- Seed Categories
INSERT OR REPLACE INTO categories (id, name, slug, description, image_url) VALUES 
(1, 'Almond Chocolates', 'almond-chocolates', 'Handcrafted chocolates combined with slow-roasted, caramelized premium almonds.', '/images/category_almond.png'),
(2, 'Pistachio Chocolates', 'pistachio-chocolates', 'Elegant selections filled with rich, creamy stone-ground pistachio praline.', '/images/category_pistachio.png'),
(3, 'Walnut Chocolates', 'walnut-chocolates', 'Sophisticated pairings of dark cocoa and crunchy, buttery local walnuts.', '/images/category_walnut.png'),
(4, 'Cashew Chocolates', 'cashew-chocolates', 'Delicate milk chocolate filled with silky salted honey cashew cream.', '/images/category_cashew.png'),
(5, 'Date Chocolates', 'date-chocolates', 'Organic premium dates stuffed with nuts and enrobed in fine Belgian chocolate.', '/images/category_date.png');

-- Seed Products (Pieces for the custom box builder)
INSERT OR REPLACE INTO products (id, category_id, name, slug, description, price, image_url, shape, fillings, ingredients, nutritional_info, in_stock) VALUES
(1, 1, 'Almond Rocher Cube', 'almond-rocher-cube', 'Milk chocolate cube with toasted almond slivers and praline filling.', 150.00, '/images/category_almond.png', 'cube', 'almond', 'Sugar, cocoa butter, whole milk powder, almonds, cocoa mass, emulsifier (soy lecithin).', 'Calories: 55, Fat: 3.5g, Carbs: 5g, Protein: 1g', 1),
(2, 1, 'Almond Butter Heart', 'almond-butter-heart', 'Rich dark chocolate heart oozing with creamy salted almond butter.', 160.00, '/images/category_almond.png', 'heart', 'almond', 'Cocoa mass, sugar, almonds, cocoa butter, sea salt, vanilla.', 'Calories: 52, Fat: 4g, Carbs: 4g, Protein: 1.2g', 1),
(3, 2, 'Pistachio Praline Heart', 'pistachio-praline-heart', 'Elegant green-flecked heart with smooth stone-ground pistachio praline.', 180.00, '/images/category_pistachio.png', 'heart', 'pistachio', 'Sugar, cocoa butter, pistachios, whole milk powder, green tea powder (for color).', 'Calories: 58, Fat: 4.2g, Carbs: 4.5g, Protein: 1.5g', 1),
(4, 2, 'Pistachio Crunch Cube', 'pistachio-crunch-cube', 'Dark chocolate cube with crunchy roasted pistachios and sea salt.', 170.00, '/images/category_pistachio.png', 'cube', 'pistachio', 'Cocoa mass, sugar, pistachios, cocoa butter, sea salt.', 'Calories: 54, Fat: 3.8g, Carbs: 4.8g, Protein: 1.3g', 1),
(5, 3, 'Walnut Ganache Cube', 'walnut-ganache-cube', 'Double dark chocolate cube filled with espresso-infused walnut ganache.', 160.00, '/images/category_walnut.png', 'cube', 'walnut', 'Cocoa mass, sugar, walnuts, cream, espresso, cocoa butter.', 'Calories: 53, Fat: 3.9g, Carbs: 4.2g, Protein: 1.1g', 1),
(6, 4, 'Salted Honey Cashew Bar', 'salted-honey-cashew-bar', 'Mini milk chocolate bar stuffed with crushed cashews and local honey.', 220.00, '/images/category_cashew.png', 'bar', 'cashew', 'Sugar, cocoa butter, milk solids, cashews, honey, sea salt.', 'Calories: 75, Fat: 5g, Carbs: 7g, Protein: 1.6g', 1),
(7, 5, 'Cardamom Date Heart', 'cardamom-date-heart', 'Milk chocolate heart filled with organic date caramel infused with green cardamom.', 180.00, '/images/category_date.png', 'heart', 'date', 'Sugar, cocoa butter, date paste, milk powder, cardamom, vanilla.', 'Calories: 50, Fat: 3.2g, Carbs: 5.5g, Protein: 0.9g', 1),
(8, 5, 'Stuffed Date Rocher', 'stuffed-date-rocher', 'Organic date stuffed with a whole almond, dipped in dark chocolate and gold leaf.', 250.00, '/images/category_date.png', 'custom', 'date', 'Dates, dark chocolate (cocoa mass, sugar, cocoa butter), almonds, edible gold leaf.', 'Calories: 85, Fat: 2.8g, Carbs: 14g, Protein: 1.8g', 1);

-- Seed Signature Collections (Ready-made gift boxes)
INSERT OR REPLACE INTO signature_collections (id, name, slug, description, price, image_url, pieces, occasion, in_stock) VALUES
(1, 'Celebration No. 8', 'celebration-no-8', 'A regal 16-piece collection packaged in a warm ivory embossed box with a deep forest green velvet ribbon. Features a balanced selection of almond rochers, cardamom date hearts, and pistachio pralines.', 4500.00, '/images/hero_gift_box.png', 16, 'eid', 1),
(2, 'The Royal Gifting Array', 'the-royal-gifting-array', 'An opulent 25-piece assortment presented in a multi-tiered cream lacquer box with champagne gold foiling. Ideal for proposals, weddings, and premium celebrations.', 8500.00, '/images/hero_gift_box.png', 25, 'wedding', 1),
(3, 'The Signature Box', 'the-signature-box', 'A minimalist 9-piece box crafted for personal moments and sophisticated thank-you gestures. Elegantly wrapped with handmade linen cord.', 2800.00, '/images/chocolate_box.png', 9, 'anniversary', 1),
(4, 'Midnight Pistachio Selection', 'midnight-pistachio-selection', 'A 16-piece geometric copper-engraved box celebrating local heritage. Highlights dates stuffed with roasted nuts, honey cashew bars, and cardamom date ganache.', 4200.00, '/images/category_pistachio.png', 16, 'ramadan', 1);
