import { Prisma, PrismaClient } from '@prisma/client';
import { seedImages } from './images.seed';
import { seedConfiguration } from './configuration.seed';
import { ProductFactory } from './create-product';
import { PRODUCTS } from './products';

const prisma = new PrismaClient();

// const BRANDS = ['nike', 'adidas', 'reebok', 'mizuno', 'puma', 'under armour'];
// const CATEGORIES = [
//   'football',
//   'basketball',
//   'volleyball',
//   'tennis',
//   'running',
// ];
// const SPORTS = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Бег'];
const ORIGINS = ['Вьетнам', 'Индонезия', 'Китай', 'Мьянма'];
const SEASONS = ['Мульти'];
const MATERIALS = ['Резина', 'Текстиль'];

const main = async () => {
  await prisma.brand.createMany({
    data: [
      {
        name: 'nike',
      },
      {
        name: 'adidas',
      },
      {
        name: 'reebok',
      },
      {
        name: 'mizuno',
      },
      {
        name: 'puma',
      },
      {
        name: 'under armour',
      },
      {
        name: 'anta',
      },
      {
        name: 'asics',
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        name: 'football',
      },
      {
        name: 'basketball',
      },
      {
        name: 'volleyball',
      },
      {
        name: 'tennis',
      },
      {
        name: 'running',
      },
    ],
  });

  await prisma.sport.createMany({
    data: [
      {
        name: 'Футбол',
      },
      {
        name: 'Баскетбол',
      },
      {
        name: 'Волейбол',
      },
      {
        name: 'Теннис',
      },
      {
        name: 'Бег',
      },
    ],
  });

  await Promise.all(
    ORIGINS.map(
      async (origin) => await prisma.origin.create({ data: { name: origin } }),
    ),
  );

  await Promise.all(
    SEASONS.map(
      async (season) => await prisma.season.create({ data: { name: season } }),
    ),
  );

  await Promise.all(
    MATERIALS.map(
      async (material) =>
        await prisma.material.create({ data: { name: material } }),
    ),
  );

  await prisma.badge.create({
    data: { backgroundColor: '#5D7EF1', color: '#fff', text: 'Топ продаж' },
  });

  const products = PRODUCTS.map(
    (product, index) => new ProductFactory(product, index),
  );

  const productsData = products.map((product) =>
    product.getProductData(),
  ) as unknown as Prisma.ProductCreateManyInput;

  await prisma.product.createMany({
    data: productsData,
  });

  await seedImages(prisma, products);

  await seedConfiguration(prisma, products);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
