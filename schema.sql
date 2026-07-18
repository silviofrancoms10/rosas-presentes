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
