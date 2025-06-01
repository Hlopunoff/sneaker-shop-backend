import { PrismaClient } from '@prisma/client';
import { ProductFactory } from './create-product';

export const seedConfiguration = async (
  prisma: PrismaClient,
  products: ProductFactory[],
) => {
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
    data: new Array(11).fill(null).map((_, index) => ({ value: index + 35 })),
  });

  await prisma.size.createMany({
    data: new Array(products.length).fill({
      title: 'Размер',
      type: 'size',
    }),
  });

  await prisma.sizeValueOnSize.createMany({
    data: products.map((product) => product.getSizesConfig()).flat(),
  });

  await prisma.color.createMany({
    data: new Array(products.length).fill({
      title: 'Цвет',
      type: 'color',
    }),
  });

  await prisma.colorValueOnColor.createMany({
    data: products.map((product) => product.getColorConfig()).flat(),
  });

  await prisma.configuration.createMany({
    data: products.map((product) => product.getConfig()),
  });
};
