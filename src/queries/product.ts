export const PRODUCT_QUERY_BASE = {
  omit: {
    badgeId: true,
    brandId: true,
    categoryId: true,
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
    productInfo: {
      omit: {
        id: true,
        productId: true,
      },
      include: {
        details: {
          omit: {
            id: true,
            productInfoId: true,
          },
        },
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
