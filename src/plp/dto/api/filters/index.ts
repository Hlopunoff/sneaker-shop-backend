import { IsObject } from 'class-validator';
import {
  ApiBrandDto,
  ApiProductConfigurationDto,
} from 'src/pdp/dto/api/product';

export class ApiFiltersDto {
  @IsObject()
  brand: ApiBrandDto;

  @IsObject()
  configuration: ApiProductConfigurationDto;
}
