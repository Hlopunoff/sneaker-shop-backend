import { PrismaClient } from '@prisma/client';
import { ProductFactory } from './create-product';

export const seedImages = async (
  prisma: PrismaClient,
  products: ProductFactory[],
) => {
  const images = products.map((product) => product.getImages()).flat();

  await prisma.image.createMany({
    data: images,
  });
};
