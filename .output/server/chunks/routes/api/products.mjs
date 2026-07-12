import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const products$1 = [
	{
		id: "flor-01",
		name: "Buquê Magnífico de Rosas Vermelhas",
		description: "Clássico e elegante buquê com 12 rosas vermelhas selecionadas e folhagens nobres.",
		price: 195.9,
		category: "buques",
		categories: [
			"buques",
			"destaques"
		],
		image: "/images/produtos/buque-rosas-vermelhas.jpg",
		images: [
			"/images/produtos/buque-rosas-vermelhas.jpg",
			"/images/produtos/buque-rosas-vermelhas-detail.jpg"
		],
		featured: true,
		installments: "3x de R$ 65,30 sem juros",
		oldPrice: 250
	},
	{
		id: "flor-02",
		name: "Arranjo Brilho do Sol (Girassóis)",
		description: "Lindo arranjo de girassóis vibrantes montado em vaso decorativo para iluminar o dia.",
		price: 140,
		category: "buques",
		categories: [
			"buques"
		],
		image: "/images/produtos/arranjo-girassois.jpg",
		images: [
			"/images/produtos/arranjo-girassois.jpg"
		],
		featured: true,
		installments: "3x de R$ 46,66 sem juros"
	},
	{
		id: "cesta-01",
		name: "Cesta de Café da Manhã Premium",
		description: "Cesta completa com pães artesanais, frios, suco integral, frutas da estação, caneca exclusiva e arranjo de mini rosas.",
		price: 325,
		category: "cestas",
		categories: [
			"cestas",
			"destaques"
		],
		image: "/images/produtos/cesta-cafe-premium.jpg",
		images: [
			"/images/produtos/cesta-cafe-premium.jpg",
			"/images/produtos/cesta-cafe-premium-detail.jpg"
		],
		featured: true,
		installments: "3x de R$ 108,33 sem juros"
	},
	{
		id: "cesta-02",
		name: "Cesta Gostosuras de Chocolate",
		description: "Cesta recheada com caixa de Ferrero Rocher, bombons finos, cookies e um urso de pelúcia médio.",
		price: 175,
		oldPrice: 195,
		category: "cestas",
		categories: [
			"cestas"
		],
		image: "/images/produtos/cesta-chocolates.jpg",
		images: [
			"/images/produtos/cesta-chocolates.jpg"
		],
		featured: false,
		installments: "3x de R$ 58,33 sem juros"
	},
	{
		id: "pres-01",
		name: "A Bela Rosa Encantada Vermelha",
		description: "Rosa importada preservada em cúpula de vidro (durabilidade de até 2 anos) inspirada em contos de fadas.",
		price: 239.9,
		category: "presentes",
		categories: [
			"presentes",
			"destaques"
		],
		image: "/images/produtos/rosa-encantada.jpg",
		images: [
			"/images/produtos/rosa-encantada.jpg",
			"/images/produtos/rosa-encantada-detail.jpg"
		],
		featured: true,
		installments: "3x de R$ 79,97 sem juros"
	},
	{
		id: "pres-02",
		name: "Box Love & Vinho",
		description: "Caixa cartonada premium contendo uma garrafa de vinho tinto, taça personalizada e arranjo de 6 rosas.",
		price: 295,
		category: "presentes",
		categories: [
			"presentes",
			"destaques"
		],
		image: "/images/produtos/box-vinho-rosas.jpg",
		images: [
			"/images/produtos/box-vinho-rosas.jpg"
		],
		featured: false,
		installments: "3x de R$ 98,33 sem juros"
	},
	{
		id: "bromelia-01",
		name: "Bomelia",
		description: "Bromélia Linda",
		price: 352,
		oldPrice: 529,
		category: "buques",
		categories: [
			"buques",
			"presentes",
			"destaques"
		],
		image: "/images/produtos/screenshot-from-2026-07-12-16-18-56.png",
		images: [
			"/images/produtos/screenshot-from-2026-07-12-16-18-56.png"
		],
		featured: true,
		installments: "3x de 117.34 Sem Juros"
	}
];

const products = defineEventHandler(() => {
  return products$1;
});

export { products as default };
//# sourceMappingURL=products.mjs.map
