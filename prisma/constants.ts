export const categories = [
	{
		name: 'Пицца',
	},
	{
		name: 'Завтрак',
	},
	{
		name: 'Закуски',
	},
	{
		name: 'Коктейли',
	},
	{
		name: 'Напитки',
	},
]

// 4:40:00
export const _ingredients = [
	{
		name: 'Сырный бортик',
		price: 179,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
	},
	{
		name: 'Бекон',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
	},
	{
		name: 'Ветчина',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
	},
	{
		name: 'Красный лук',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
	},
	{
		name: 'Митболы',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
	{
		name: 'Омлет с беконом',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7970326512C89366583FF997CA9E.jpg',
		categoryId: 2,
	},
	{
		name: 'Омлет с веченой и сыром',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.jpg',
		categoryId: 2,
	},
	{
		name: 'Омлет сырный',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE797033873EB1B4B77F7E70BBA37E.jpg',
		categoryId: 2,
	},

	{
		name: 'Додстер с ветчиной',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.jpg',
		categoryId: 3,
	},
	{
		name: 'Сырники со сгущенкой',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61877A2EE09AA2178718EFB59C.jpg',
		categoryId: 3,
	},
	{
		name: 'Сырники с малиновым вареньем',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B7B71E8AA288725FC097A7BE.jpg',
		categoryId: 3,
	},

	{
		name: 'Сырники с малиновым вареньем NEW',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B7B71E8AA288725FC097A7BE.jpg',
		categoryId: 3,
	},

	{
		name: 'Кока кола малина',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EECF75D8792640A28A2BEF37367897.jpg',
		categoryId: 4,
	},
	{
		name: 'Добрый лайм лимон',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61BAB86255A811FEEA677AD674.jpg',
		categoryId: 4,
	},
	{
		name: 'Яблочный сок Rich',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B27F1652B9A918BDDD753D8D.jpg',
		categoryId: 4,
	},
	{
		name: 'Яблочный сок Rich NEW',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B27F1652B9A918BDDD753D8D.jpg',
		categoryId: 4,
	},

	{
		name: 'Кофе американо',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.jpg',
		categoryId: 5,
	},
	{
		name: 'Кофе капучино',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61AE1813B4AB42D8927D061035.jpg',
		categoryId: 5,
	},
	{
		name: 'Кофе латте',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.jpg',
		categoryId: 5,
	},

	{
		name: 'Кофе латте NEW',
		imageUrl:
			'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.jpg',
		categoryId: 5,
	},
]
