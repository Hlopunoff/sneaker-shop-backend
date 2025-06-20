import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PRODUCT_QUERY_BASE } from 'src/queries/product';
import { FiltersDto } from './dto';

@Injectable()
export class PlpRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getListing(category: string) {
    return await this.databaseService.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
      ...PRODUCT_QUERY_BASE,
    });
  }

  async getFilters(category: string) {
    return await this.databaseService.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
      omit: {
        badgeId: true,
        brandId: true,
        categoryId: true,
        currentPrice: true,
        id: true,
        isFavorite: true,
        isPopular: true,
        name: true,
        oldPrice: true,
      },
      include: {
        brand: {
          select: {
            name: true,
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
                title: true,
                type: true,
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
                title: true,
                type: true,
              },
              include: {
                values: {
                  select: {
                    sizeValue: true,
                  },
                  orderBy: {
                    sizeValue: {
                      value: 'asc',
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getListingByFilters(dto: FiltersDto) {
    const { category, color, size, brand } = dto;

    return await this.databaseService.product.findMany({
      where: {
        AND: [
          {
            category: {
              name: category,
            },
          },
          brand
            ? {
                brand: {
                  name: brand,
                },
              }
            : {},
          color
            ? {
                configuration: {
                  colors: {
                    values: {
                      some: {
                        colorValue: {
                          value: color,
                        },
                      },
                    },
                  },
                },
              }
            : {},
          size
            ? {
                configuration: {
                  sizes: {
                    values: {
                      some: {
                        sizeValue: {
                          value: size,
                        },
                      },
                    },
                  },
                },
              }
            : {},
        ],
      },
      ...PRODUCT_QUERY_BASE,
    });
  }

  async getPlacements() {
    return await this.databaseService.product.findMany({
      where: {
        isPopular: true,
      },
      ...PRODUCT_QUERY_BASE,
    });
  }
}
