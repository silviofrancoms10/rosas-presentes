INSERT INTO categories (id, name, image) VALUES
('todos', 'Todos', '/images/categorias/categoria-todos.jpg'),
('destaques', 'Destaques', '/images/categorias/categoria-todos.jpg'),
('buques', 'Buquês', '/images/categorias/categoria-buques.jpg'),
('cestas', 'Cestas', '/images/categorias/categoria-cestas.jpg'),
('presentes', 'Presentes', '/images/categorias/categoria-presentes.jpg')
ON CONFLICT(id) DO NOTHING;
