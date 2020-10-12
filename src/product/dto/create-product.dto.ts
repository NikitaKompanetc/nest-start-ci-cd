import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}