-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  oldPrice REAL,
  category TEXT NOT NULL,
  categories TEXT, -- Array JSON com IDs de categorias vinculadas (ex: '["buques", "destaques"]')
  image TEXT,
  images TEXT, -- Array JSON contendo URLs de imagens adicionais (ex: '["https://...", "https://..."]')
  featured INTEGER DEFAULT 0, -- 1 para Destaque (exibido no banner), 0 caso contrário
  installments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_date TEXT NOT NULL,
  delivery_time TEXT,
  card_message TEXT,
  payment_method TEXT NOT NULL,
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'novo', -- 'novo', 'enviado', 'cancelado', 'concluido'
  payment_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

