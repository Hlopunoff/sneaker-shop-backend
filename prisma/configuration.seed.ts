import { PrismaClient } from '@prisma/client';

export const seedConfiguration = async (prisma: PrismaClient) => {
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
