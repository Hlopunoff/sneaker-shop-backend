import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BRANDS = ['nike', 'adidas', 'reebok', 'mizuno'];
const CATEGORIES = ['football', 'basketball', 'volleyball', 'tennis'];

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

  await prisma.product.createMany({
    data: [
      {
        name: 'LIGRA 7 M',
        currentPrice: 5999,
        oldPrice: 9999,
        badgeId: 1,
        brandId: 2,
        categoryId: 2,
      },
      {
        name: 'GOLETTO VIII TF',
        currentPrice: 5999,
        oldPrice: 9999,
        badgeId: 1,
        brandId: 3,
        categoryId: 2,
      },
      {
        name: 'WAVE EXCEED TOUR 6 AC',
        currentPrice: 18499,
        badgeId: 1,
        brandId: 4,
        categoryId: 4,
      },
    ],
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
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADL970801_23230092_1_v1.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADL970801_23230093_2_v1.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADL970801_23230094_3_v1.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADL970801_23230096_5_v1.jpg',
        productId: 3,
      },
      {
        productId: 2,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504250_1_v1.jpg',
      },
      {
        productId: 2,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504251_2_v1.jpg',
      },
      {
        productId: 2,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLACX553201_21504252_3_v1.jpg',
      },
      {
        productId: 2,
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
      {
        productId: 2,
        title: 'О товаре',
      },
      {
        productId: 2,
        title: 'Описание',
      },
      {
        productId: 3,
        title: 'О товаре',
      },
      {
        productId: 3,
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
      {
        info: 'Резина',
        title: 'Материал подошвы',
        productInfoId: 3,
      },
      {
        info: 'Волейбол',
        title: 'Вид спорта',
        productInfoId: 3,
      },
      {
        info: 'Кроссовки выполнены из искусственной кожи и текстиля. Промежуточная подошва из пеноматериала ЭВА смягчает удары стопы о поверхность и поглощает вибрации. Немаркая подошва Adiwear.',
        productInfoId: 4,
      },
      {
        info: 'Текстиль',
        title: 'Материал',
        productInfoId: 5,
      },
      {
        info: 'Мельти',
        title: 'Сезон',
        productInfoId: 5,
      },
      {
        info: 'Вьетнам',
        title: 'Страна производства',
        productInfoId: 5,
      },
      {
        info: 'Кроссовки Wave Exceed Tour 6 Ac. Быстрее, легче и гибче, чем раньше, эта теннисная обувь предназначена для продвинутых игроков, которые ищут максимальную взрывную реакцию. Абсолютно новая конструкция ботинок и обновленный дизайн верха 3D-SOLID обеспечивают большую гибкость и комфорт. Технология MIZUNO WAVE® повышает стабильность лодыжки и перераспределяет ударные нагрузки, а подошва DuRubber обеспечивает надежность и долговечность, необходимые лучшим игрокам.',
        productInfoId: 6,
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
      {
        color: '#FFA500',
        value: 'оранжевый',
      },
    ],
  });

  await prisma.sizeValue.createMany({
    data: [{ value: 40 }, { value: 41 }, { value: 42 }, { value: 43 }],
  });

  await prisma.size.createMany({
    data: [
      {
        title: 'Размер',
        type: 'size',
      },
      {
        title: 'Размер',
        type: 'size',
      },
      {
        title: 'Размер',
        type: 'size',
      },
    ],
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
      {
        sizeId: 2,
        sizeValueId: 2,
      },
      {
        sizeId: 2,
        sizeValueId: 3,
      },
      {
        sizeId: 2,
        sizeValueId: 1,
      },
      {
        sizeId: 3,
        sizeValueId: 2,
      },
      {
        sizeId: 3,
        sizeValueId: 3,
      },
      {
        sizeId: 3,
        sizeValueId: 1,
      },
    ],
  });

  await prisma.color.createMany({
    data: [
      {
        title: 'Цвет',
        type: 'color',
      },
      {
        title: 'Цвет',
        type: 'color',
      },
      {
        title: 'Цвет',
        type: 'color',
      },
    ],
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
      {
        colorId: 2,
        colorValueId: 5,
      },
      {
        colorId: 2,
        colorValueId: 4,
      },
      {
        colorId: 3,
        colorValueId: 3,
      },
    ],
  });

  await prisma.configuration.createMany({
    data: [
      {
        productId: 1,
        colorsId: 1,
        sizesId: 1,
      },
      {
        productId: 2,
        colorsId: 2,
        sizesId: 2,
      },
      {
        productId: 3,
        colorsId: 3,
        sizesId: 3,
      },
    ],
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
