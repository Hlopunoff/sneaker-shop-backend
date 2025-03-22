import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BRANDS = ['nike', 'adidas', 'reebok'];
const CATEGORIES = ['football', 'basketball', 'volleyball'];

const main = async () => {
  await Promise.all(
    BRANDS.map((brand) => prisma.brand.create({ data: { name: brand } })),
  );

  await Promise.all(
    CATEGORIES.map((category) =>
      prisma.category.create({ data: { name: category } }),
    ),
  );

  await prisma.badge.create({
    data: { backgroundColor: '#5D7EF1', color: '#fff', text: 'Топ продаж' },
  });

  await prisma.product.create({
    data: {
      name: 'WAVE EXCEED TOUR 6 AC',
      currentPrice: 5999,
      oldPrice: 9999,
      badge: {
        connect: { id: 1 },
      },
      brand: {
        connect: { id: 3 },
      },
      category: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.image.createMany({
    data: [
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504250_1_v1.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504251_2_v1.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504252_3_v1.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504254_5_v1.jpg',
      },
    ],
  });

  await prisma.productInfo.createMany({
    data: [
      {
        productId: 1,
        title: 'О товаре',
      },
      {
        productId: 1,
        title: 'Описание',
      },
    ],
  });

  await prisma.productDetails.createMany({
    data: [
      {
        info: 'Текстиль',
        title: 'Материал',
        productInfoId: 1,
      },
      {
        info: 'Мельти',
        title: 'Сезон',
        productInfoId: 1,
      },
      {
        info: 'Кроссовки Wave Exceed Tour 6 Ac. Быстрее, легче и гибче, чем раньше, эта теннисная обувь предназначена для продвинутых игроков, которые ищут максимальную взрывную реакцию. Абсолютно новая конструкция ботинок и обновленный дизайн верха 3D-SOLID обеспечивают большую гибкость и комфорт. Технология MIZUNO WAVE® повышает стабильность лодыжки и перераспределяет ударные нагрузки, а подошва DuRubber обеспечивает надежность и долговечность, необходимые лучшим игрокам.',
        productInfoId: 2,
      },
    ],
  });

  await prisma.colorValue.createMany({
    data: [
      {
        color: '#000',
        value: 'черный',
      },
      {
        color: '#fff',
        value: 'белый',
      },
      {
        color: '#96aed3',
        value: 'синий',
      },
      {
        color: 'd1a0a0',
        value: 'розовый',
      },
    ],
  });

  await prisma.sizeValue.createMany({
    data: [{ value: 40 }, { value: 41 }, { value: 42 }, { value: 43 }],
  });

  await prisma.size.create({
    data: {
      title: 'Размер',
      type: 'size',
    },
  });

  await prisma.sizeValueOnSize.createMany({
    data: [
      {
        sizeId: 1,
        sizeValueId: 3,
      },
      {
        sizeId: 1,
        sizeValueId: 4,
      },
    ],
  });

  await prisma.color.create({
    data: {
      title: 'Цвет',
      type: 'color',
    },
  });

  await prisma.colorValueOnColor.createMany({
    data: [
      {
        colorId: 1,
        colorValueId: 1,
      },
      {
        colorId: 1,
        colorValueId: 3,
      },
    ],
  });

  await prisma.configuration.create({
    data: {
      productId: 1,
      colorsId: 1,
      sizesId: 1,
    },
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
