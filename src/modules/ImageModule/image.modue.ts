import { Module } from '@nestjs/common';
import { DbModule } from 'src/persistance/dbmodule.module';
import { ImageService } from './image.service';

@Module({
  imports: [DbModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
