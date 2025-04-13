import { IsHexColor, IsNumber } from 'class-validator';

export class SelectedConfigurationClass {
  @IsNumber()
  size: number;

  @IsHexColor()
  color: string;

  constructor(size: number, color: string) {
    this.size = size;
    this.color = color;
  }
}
