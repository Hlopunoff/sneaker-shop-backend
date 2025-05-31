export const PRODUCT_QUERY_BASE = {
  omit: {
    badgeId: true,
    brandId: true,
    categoryId: true,
    seasonId: true,
    materialId: true,
    originId: true,
    sportId: true,
  },
  include: {
    brand: {
      select: {
        name: true,
      },
    },
    category: {
      select: {
        name: true,
      },
    },
    season: {
      select: {
        name: true,
      },
    },
    sport: {
      select: {
        name: true,
      },
    },
    origin: {
      select: {
        name: true,
      },
    },
    material: {
      select: {
        name: true,
      },
    },
    badge: {
      omit: {
        id: true,
      },
    },
    images: {
      select: {
        url: true,
      },
    },
    configuration: {
      omit: {
        id: true,
        productId: true,
        colorsId: true,
        sizesId: true,
      },
      include: {
        colors: {
          omit: {
            id: true,
          },
          include: {
            values: {
              select: {
                colorValue: true,
              },
            },
          },
        },
        sizes: {
          omit: {
            id: true,
          },
          include: {
            values: {
              select: {
                sizeValue: true,
              },
            },
          },
        },
      },
    },
  },
};
