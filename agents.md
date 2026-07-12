# Contexto do Projeto: Rosas Presentes

Este documento serve como a única fonte de verdade e guia de diretrizes para o desenvolvimento do e-commerce **Rosas Presentes, Floricultura e Cestas Café**. O projeto foi inicializado utilizando **Vue 3 (Composition API)**, **TypeScript**, **Vite**, **Pinia** e **Vue Router**.

---

## 🎨 Identidade Visual e UI/UX

A interface deve evocar sofisticação, afeto e clareza, combinando uma paleta de cores marcante com o minimalismo moderno do Glassmorphism.

### Paleta de Cores Oficial

- 🔴 **Borgonha / Vermelho Escuro (`#780000`):** Cor primária. Usada para a marca, botões principais de ação (CTA), títulos importantes e cabeçalhos.
- 🔻 **Vermelho Vivo (`#c1121f`):** Cor secundária. Usada para estados de hover, badges de desconto, alertas e ícones de destaque (como o coração de favoritos).
- 🌾 **Bege Claro (`#fdf0d5`):** **Cor de fundo obrigatória de todas as telas.** Garante consistência visual, reduz a fadiga ocular e faz os produtos se destacarem.

### Elementos de Interface Obrigatórios

1. **Fundo Global Unificado:** Todas as views (`Home`, `Vitrine`, `Checkout`) devem possuir o fundo fixo no tom bege (`#fdf0d5`).
2. **Banner em Carrossel:** Localizado no topo da página inicial, deve ser interativo e passar automaticamente (ou via clique), destacando coleções sazonais e produtos marcados como destaque.
3. **Cards Glassmorph:** Cada produto na vitrine deve ser envelopado em um card com efeito de vidro fosco, bordas finas translúcidas e desfoque de fundo.

---

## 🛠️ Arquitetura de Estilização (Tailwind Componentizado)

> ⚠️ **REGRA ESTRITA DE CÓDIGO:** É expressamente proibido poluir os templates HTML/Vue com strings longas de classes utilitárias do Tailwind (ex: `class="bg-white/40 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-sm"`). Os estilos devem ser isolados.

Os agentes de IA e desenvolvedores devem utilizar arquivos de estilo centralizados dentro de `src/assets/styles/` através da diretiva `@apply` do Tailwind.

### Configuração do `tailwind.config.js` (Referência)

As cores devem ser estendidas no arquivo de configuração do Tailwind para manter o padrão sem valores hardcoded:

```javascript
theme: {
  extend: {
    colors: {
      burgundy: '#780000',
      crimson: '#c1121f',
      almond: '#fdf0d5',
    }
  }
}
Arquivo Central de Componentes (src/assets/styles/main.css)
Crie e utilize as classes abaixo nos componentes correspondentes:

CSS
/* Card com efeito Glassmorphism */
.product-card-glass {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(120, 0, 0, 0.05);
  @apply rounded-2xl p-4 transition-all duration-300 ease-in-out;
}

.product-card-glass:hover {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 12px 40px 0 rgba(120, 0, 0, 0.1);
  @apply -translate-y-1;
}

/* Botões da Identidade Visual */
.btn-primary {
  @apply bg-burgundy text-almond font-semibold px-6 py-2 rounded-xl transition-colors duration-200 hover:bg-crimson;
}

.btn-secondary {
  @apply border border-burgundy text-burgundy font-semibold px-6 py-2 rounded-xl transition-colors duration-200 hover:bg-burgundy/10;
}
📊 Catálogo de Produtos e Dados da Loja (Mock Estruturado)
Modelo de dados e produtos reais baseados no nicho de floricultura, cestas de café da manhã e presentes para alimentar os componentes.

Tipagem TypeScript (src/types/product.ts)
TypeScript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: 'buques' | 'cestas' | 'presentes';
  image: string;
  featured: boolean; // Identifica se vai para o Carrossel da Home
  installments: string;
}
Base de Dados do Catálogo (src/data/products.json)
JSON
[
  {
    "id": "flor-01",
    "name": "Buquê Magnífico de Rosas Vermelhas",
    "description": "Clássico e elegante buquê com 12 rosas vermelhas selecionadas e folhagens nobres.",
    "price": 195.90,
    "category": "buques",
    "image": "/images/produtos/buque-rosas-vermelhas.webp",
    "featured": true,
    "installments": "3x de R$ 65,30 sem juros"
  },
  {
    "id": "flor-02",
    "name": "Arranjo Brilho do Sol (Girassóis)",
    "description": "Lindo arranjo de girassóis vibrantes montado em vaso decorativo para iluminar o dia.",
    "price": 140.00,
    "category": "buques",
    "image": "/images/produtos/arranjo-girassois.webp",
    "featured": false,
    "installments": "3x de R$ 46,66 sem juros"
  },
  {
    "id": "cesta-01",
    "name": "Cesta de Café da Manhã Premium",
    "description": "Cesta completa com pães artesanais, frios, suco integral, frutas da estação, caneca exclusiva e arranjo de mini rosas.",
    "price": 325.00,
    "category": "cestas",
    "image": "/images/produtos/cesta-cafe-premium.webp",
    "featured": true,
    "installments": "3x de R$ 108,33 sem juros"
  },
  {
    "id": "cesta-02",
    "name": "Cesta Gostosuras de Chocolate",
    "description": "Cesta recheada com caixa de Ferrero Rocher, bombons finos, cookies e um urso de pelúcia médio.",
    "price": 175.00,
    "oldPrice": 195.00,
    "category": "cestas",
    "image": "/images/produtos/cesta-chocolates.webp",
    "featured": false,
    "installments": "3x de R$ 58,33 sem juros"
  },
  {
    "id": "pres-01",
    "name": "A Bela Rosa Encantada Vermelha",
    "description": "Rosa importada preservada em cúpula de vidro (durabilidade de até 2 anos) inspirada em contos de fadas.",
    "price": 239.90,
    "category": "presentes",
    "image": "/images/produtos/rosa-encantada.webp",
    "featured": true,
    "installments": "3x de R$ 79,97 sem juros"
  },
  {
    "id": "pres-02",
    "name": "Box Love & Vinho",
    "description": "Caixa cartonada premium contendo uma garrafa de vinho tinto, taça personalizada e arranjo de 6 rosas.",
    "price": 295.00,
    "category": "presentes",
    "image": "/images/produtos/box-vinho-rosas.webp",
    "featured": false,
    "installments": "3x de R$ 98,33 sem juros"
  }
]
🎯 Instruções Gerais de Desenvolvimento para Agentes de IA
Ao criar ou atualizar arquivos, certifique-se de seguir os padrões técnicos validados no package.json:

Abordagem de Componentização Vue: Escreva todos os componentes utilizando a sintaxe SFC <script setup lang="ts">.

Strict Types: Não utilize any nas propriedades dos componentes. Use estritamente as interfaces definidas em src/types/.

Gerenciamento de Estado: Use o Pinia para as regras de negócio globais como o carrinho de compras (cartStore.ts) e o estado dos produtos selecionados.

Qualidade de Código: Respeite o fluxo de linting rápido provido pelo oxlint e formatação via oxfmt em todo o diretório src/. Código limpo e sem duplicações de CSS utilitário é obrigatório.
```
