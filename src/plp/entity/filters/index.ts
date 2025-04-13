import { IsArray } from 'class-validator';
import { ApiFiltersDto } from '../../dto/api';
import { getUniqueValues } from '../../helpers/get-unique-values';

export class FiltersEntity {
  @IsArray()
  brands: string[];

  @IsArray()
  colors: string[];

  @IsArray()
  sizes: string[];

  constructor(data: ApiFiltersDto[]) {
    this.brands = getUniqueValues(data.map((item) => item.brand.name));
    this.colors = this.getUniqueColors(data);
    this.sizes = this.getUniqueSizes(data);
  }

  private getUniqueColors(data: any[]) {
    const colorsData = data.flatMap((item) => item.configuration.colors.values);
    const colors = colorsData.map((item) => item.colorValue.value);

    return getUniqueValues(colors);
  }

  private getUniqueSizes(data: any[]) {
    const sizesData = data.flatMap((item) => item.configuration.sizes.values);
    const sizes = sizesData.map((item) => item.sizeValue.value);

    return getUniqueValues(sizes);
  }
}
