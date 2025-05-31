import { PrismaClient } from '@prisma/client';
import { seedImages } from './images.seed';
import { seedConfiguration } from './configuration.seed';

const prisma = new PrismaClient();

const BRANDS = ['nike', 'adidas', 'reebok', 'mizuno'];
const CATEGORIES = [
  'football',
  'basketball',
  'volleyball',
  'tennis',
  'running',
];
const SPORTS = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Бег'];
const ORIGINS = ['Вьетнам', 'Индонезия'];
const SEASONS = ['Мульти'];
const MATERIALS = ['Резина', 'Текстиль'];

const main = async () => {
  await Promise.all(
    BRANDS.map((brand) => prisma.brand.create({ data: { name: brand } })),
  );

  await Promise.all(
    CATEGORIES.map((category) =>
      prisma.category.create({ data: { name: category } }),
    ),
  );

  await Promise.all(
    SPORTS.map((sport) =>
      prisma.sport.create({
        data: {
          name: sport,
        },
      }),
    ),
  );

  await Promise.all(
    ORIGINS.map((origin) => prisma.origin.create({ data: { name: origin } })),
  );

  await Promise.all(
    SEASONS.map((season) => prisma.season.create({ data: { name: season } })),
  );

  await Promise.all(
    MATERIALS.map((material) =>
      prisma.material.create({ data: { name: material } }),
    ),
  );

  await prisma.badge.create({
    data: { backgroundColor: '#5D7EF1', color: '#fff', text: 'Топ продаж' },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'RUNFALCON 5',
        currentPrice: 5199,
        oldPrice: 7999,
        badgeId: 1,
        brandId: 2,
        categoryId: 5,
        sportId: 5,
        materialId: 2,
        seasonId: 1,
        originId: 1,
        description:
          'Кроссовки выполнены из "дышащего" текстиля с полимерными накладками из искусственной кожи. Подошва Cloudfoam ощущается мягкой и поддерживающей с первой минуты. Воздухопроницаемый сетчатый верх и прочная подошва Adiwear делают эти кроссовки идеальными для ношения в течение всего дня.',
        isPopular: true,
      },
      {
        name: 'GALAXY 7 M',
        currentPrice: 5199,
        oldPrice: 6999,
        badgeId: 1,
        brandId: 2,
        categoryId: 5,
        sportId: 5,
        materialId: 2,
        seasonId: 1,
        originId: 2,
        description:
          'Кроссовки GALAXY выполнены из текстиля с полимерными накладками из искусственной кожи. Модель с усиленным мысом. Детали: стандартная колодка, шнуровка для плотной фиксации стопы, текстильная подкладка, стелька с технологией OrthoLite®, амортизирующая промежуточная подошва Cloudfoam, резиновая подметка.',
        isPopular: true,
      },
      {
        name: 'DURAMO SL2 M',
        currentPrice: 6799,
        oldPrice: 8999,
        badgeId: 1,
        brandId: 2,
        categoryId: 5,
        sportId: 5,
        materialId: 2,
        seasonId: 1,
        originId: 2,
        description:
          'Универсальные кроссовки для бега, командного спорта и силовых тренировок. Легкий верх дополнен мягчайшей подошвой. Бесшовные вставки поддерживают стопу во время ускорений и движений вбок. Детали: стандартная колодка, сетчатый верх, промежуточная подошва Lightmotion, стелька OrthoLite®, резиновая подметка.',
        isPopular: true,
      },
    ],
  });

  await seedImages(prisma);

  await seedConfiguration(prisma);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
