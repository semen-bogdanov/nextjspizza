import { Prisma, PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { _ingredients, categories, products } from './constants'

const prisma = new PrismaClient()

// 4:48:00
const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const generateProductItem = (productId: number, pizzaType?: 1 | 2, size?: 20 | 30 | 40) => {
	return {
		productId,
		size,
		pizzaType,
		price: randomNumber(190, 600),
		// carbs: randomNumber(10, 30),
		// fats: randomNumber(5, 15),
		// kcal: randomNumber(180, 300),
		// proteins: randomNumber(20, 45),
		// weight: randomNumber(400, 650),
	} as Prisma.ProductItemUncheckedCreateInput
}

// up - генерация данных
async function up() {
	// 4:26:00 - create - создание одного объекта. createMany - любое кол-во объектов т.е. create будет делать мама несколько раз.
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				//		phone: '79992222222',
				//	phoneVerified: new Date(),
				role: 'USER',
				email: 'user@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
			},
			{
				fullName: 'Admin Admin',
				//		phone: '79991111111',
				//		phoneVerified: new Date(),
				role: 'ADMIN',
				email: 'admin@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})

	await prisma.ingredient.createMany({
		data: _ingredients,
	})

	await prisma.product.createMany({
		data: products,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 40),
			},
		},
	})

	// создал дополнительно одну пиццу
	const pizza4 = await prisma.pizza.create({
		data: {
			price: 350,
			size: 40,
			type: 1,
			carbs: 1,
			fats: 1,
			kcal: 100,
			proteins: 50,
			weight: 30,
			active: true,
			productId: 1,
		},
	})

	await prisma.productItem.createMany({
		data: [
			// Пеперони фреш
			{
				productId: pizza1.id,
				pizzaType: 1,
				price: randomNumber(190, 600),
				size: 20,
			},
			{
				productId: pizza1.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 30,
			},

			{
				productId: pizza1.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 40,
			},
			// Сырная
			{
				productId: pizza2.id,
				pizzaType: 1,
				price: randomNumber(190, 600),
				size: 20,
			},
			{
				productId: pizza2.id,
				pizzaType: 1,
				price: randomNumber(190, 600),
				size: 30,
			},

			{
				productId: pizza2.id,
				pizzaType: 1,
				price: randomNumber(190, 600),
				size: 40,
			},
			{
				productId: pizza2.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 30,
			},
			{
				productId: pizza2.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 20,
			},

			{
				productId: pizza2.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 40,
			},

			// Чоризо фреш
			{
				productId: pizza3.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 20,
			},
			{
				productId: pizza3.id,
				pizzaType: 2,
				price: randomNumber(190, 600),
				size: 30,
			},

			{
				productId: pizza3.id,
				pizzaType: 1,
				price: randomNumber(190, 600),
				size: 40,
			},
			// Остальные продукты
			generateProductItem(1),
			generateProductItem(2),
			generateProductItem(3),
			generateProductItem(4),
			generateProductItem(5),
			generateProductItem(6),
			generateProductItem(7),
			generateProductItem(8),
			generateProductItem(9),
			generateProductItem(10),
			generateProductItem(11),
			generateProductItem(12),
			generateProductItem(13),
			generateProductItem(14),
			generateProductItem(15),
		],
	})

	// 5:03:00
	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '22222',
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			pizzaId: 1,
			cartId: 1,
			userId: 1,
			quantity: 2, // две вариация. Один продукт, но два варианта таких пицц
			ingredients: {
				// ингредиенты
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})

	//22:28:00
	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
			},
		],
	})

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
			},
		],
	})
}

// 4:31:00 down - очистка данных
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Pizza" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`
}

// 4:25:00
async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
