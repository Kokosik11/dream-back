import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DbModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ProductModule {}