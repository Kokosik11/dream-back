import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class ProductForCreate {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  img_path?: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  in_stock: number;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  producer?: string;
  @ApiProperty()
  charact?: string;
  @ApiProperty()
  short_descr?: string;
  @ApiProperty()
  html_descr?: string;
}
