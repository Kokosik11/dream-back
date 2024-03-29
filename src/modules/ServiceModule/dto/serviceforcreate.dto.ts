import { ApiProperty } from '@nestjs/swagger';

export class ServiceForCreate {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  img_path?: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  short_descr?: string;
}
