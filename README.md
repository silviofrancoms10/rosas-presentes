# 🌹 Rosas Presentes — Floricultura, Cestas de Café da Manhã & Presentes

Este é o repositório do e-commerce **Rosas Presentes**, desenvolvido com uma arquitetura moderna e escalável, utilizando tecnologias de ponta para a Web e serviços serverless da Cloudflare.

---

## 🚀 Tecnologias Utilizadas

### Core & Framework

- **Nuxt 4:** Framework Vue 3 (Composition API) para renderização rápida e APIs serverless unificadas.
- **TypeScript:** Tipagem estática para robustez e menor propensão a bugs.
- **TailwindCSS v4:** Nova geração da ferramenta de estilização rápida e responsiva.
- **Pinia:** Gerenciamento de estado global e reativo (carrinho de compras, vitrine, etc.).
- **Vite:** Bundler de alta performance.

### Infraestrutura & Banco de Dados (Cloudflare Serverless)

- **Cloudflare Pages:** Hospedagem da aplicação Nuxt em servidores de borda globais.
- **Cloudflare D1 (Banco de Dados):** Banco de dados SQL serverless baseado em SQLite.
- **Cloudflare R2 (Storage de Imagens):** Armazenamento de arquivos e mídias rápido, de baixo custo e com zero taxas de tráfego.

---

## 🎨 Identidade Visual e UI/UX

O design da aplicação foi concebido com foco em sofisticação, calor humano e facilidade de navegação, utilizando elementos do **Glassmorphism** e transições suaves.

- 🔴 **Borgonha / Vermelho Escuro (`#780000`):** Cor primária da marca, botões de ação principais (CTA), títulos e cabeçalhos.
- 🔻 **Vermelho Vivo (`#c1121f`):** Cor secundária, hovers, badges de desconto e corações de favoritos.
- 🌾 **Bege Claro (`#fdf0d5`):** Fundo global unificado das páginas, criando um contraste acolhedor e destacando as imagens dos produtos.

---

## 📦 Estrutura do Banco de Dados (Cloudflare D1)

Caso precise recriar ou inicializar o banco de dados no Cloudflare D1 localmente ou em produção, utilize o seguinte esquema SQL:

### Esquema SQL (`schema.sql`)

```sql
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
```

### Carga Inicial de Dados (`seed.sql`)

```sql
INSERT INTO categories (id, name, image) VALUES
('todos', 'Todos', '/images/categorias/categoria-todos.jpg'),
('destaques', 'Destaques', '/images/categorias/categoria-todos.jpg'),
('buques', 'Buquês', '/images/categorias/categoria-buques.jpg'),
('cestas', 'Cestas', '/images/categorias/categoria-cestas.jpg'),
('presentes', 'Presentes', '/images/categorias/categoria-presentes.jpg')
ON CONFLICT(id) DO NOTHING;
```

---

## 🛠️ Configuração e Execução Local

### 1. Pré-requisitos

- **Node.js** (versão 22.18.0+ ou superior)
- **pnpm** (gerenciador de pacotes)

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto contendo as seguintes variáveis:

```env
# Senha secreta de acesso ao painel admin
ADMIN_SECRET=sua_senha_aqui

# URL pública para leitura de imagens salvas no Cloudflare R2
R2_PUBLIC_URL=https://sua-url-r2-publica.dev
```

### 4. Executar Servidor de Desenvolvimento

Para testar a aplicação com emulação de funções de borda (D1, R2) da Cloudflare, use o Wrangler integrado:

```bash
pnpm dev
```

---

## 🔐 Painel Administrativo (`/admin`)

O painel admin oferece recursos completos de gerenciamento para o catálogo de produtos e categorias de forma totalmente visual:

1.  **Acesso Restrito:** Protegido por autenticação baseada no token configurado na variável `ADMIN_SECRET`.
2.  **Aba Produtos:**
    - **Criar e Editar:** Adicione novos itens informando IDs exclusivos, nomes, descrições, preços, categorias e imagens.
    - **Remoção Segura:** Exclua produtos com modal de confirmação.
    - **Banners (Carrossel):** Marcar a flag de Destaque adiciona o produto automaticamente ao banner rotativo na página inicial.
3.  **Aba Categorias:**
    - Gerencie o nome e imagem de capa de cada categoria existente.
4.  **Upload Direto no Cloudflare R2:**
    - O painel envia fotos enviadas pelo usuário diretamente ao Cloudflare R2 Storage.
    - **Compressão Client-Side:** Imagens grandes (>1.1MB) são automaticamente redimensionadas para largura máxima de 2560px e comprimidas para o formato JPEG antes do upload.
    - **Organização:** Uploads de produtos são salvos no prefixo `produtos/`, e categorias no prefixo `categorias/`.
    - **Cleanup de Imagens:** Ao atualizar uma imagem de categoria, o sistema detecta a imagem anterior no R2 e a remove automaticamente para evitar acúmulo de lixo eletrônico.

---

## ☁️ Deploy no Cloudflare (Pages & Workers)

1.  **Criar Projeto no Cloudflare Pages:**
    - Conecte seu repositório Git ao painel da Cloudflare.
    - Configure a compilação:
      - **Framework Preset:** `Nuxt`
      - **Build command:** `pnpm build`
      - **Output directory:** `.output/public`
2.  **Configurar Bindings:**
    - Vá em **Settings > Functions > Bindings** no seu projeto da Cloudflare.
    - Adicione uma **D1 Database Binding** chamada `DB` e selecione o seu banco D1.
    - Adicione uma **R2 Bucket Binding** chamada `BUCKET` e selecione o seu bucket R2.
3.  **Configurar Variáveis de Ambiente:**
    - Em **Settings > Environment variables**, adicione `ADMIN_SECRET` e `R2_PUBLIC_URL`.
