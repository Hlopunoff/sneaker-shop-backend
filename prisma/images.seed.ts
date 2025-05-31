import { PrismaClient } from '@prisma/client';

export const seedImages = async (prisma: PrismaClient) => {
  await prisma.image.createMany({
    data: [
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADP512302_25753909_1_v1_2x.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADP512302_25753910_2_v1_2x.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADP512302_25753911_3_v1_2x.jpg',
      },
      {
        productId: 1,
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADP512302_25753912_4_v1_2x.jpg',
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADO120201_24193798_1_v1.jpg',
        productId: 2,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADO120201_24193799_2_v1.jpg',
        productId: 2,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADO120201_24193800_3_v1.jpg',
        productId: 2,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADO120201_24193801_4_v1.jpg',
        productId: 2,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADX953901_26088515_1_v2_2x.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADX953901_26088516_2_v2_2x.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADX953901_26088517_3_v2_2x.jpg',
        productId: 3,
      },
      {
        url: 'https://a.lmcdn.ru/img600x866/R/T/RTLADX953901_26088518_4_v2_2x.jpg',
        productId: 3,
      },
    ],
  });
};
