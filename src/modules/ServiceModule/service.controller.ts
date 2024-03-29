import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Sorting } from 'src/decorators/sortheader.decorator';
import { Role } from 'src/enums/role.enum';
import { Sort } from 'src/enums/sort.enum';
import { CurrentUserInfo } from 'src/types/types';
import { JoiValidationPipe } from 'src/validation/joivalidation.pipe';
import { reviewFromUserSchema } from 'src/validation/schemas/reviewFromUser.schema';
import { JwtAuthGuard } from '../AuthModule/guards/jwt.guard';
import { RolesGuard } from '../AuthModule/guards/roles.guard';
import { ReviewFromUser } from './dto/reviewformuser.dto';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/helpers/imageFilter.helpers';
import { SortingBy } from 'src/decorators/sortbyheader.decorator';
import { ServiceService } from './service.service';
import { ServiceForCreate } from './dto/serviceforcreate.dto';
import { ServiceForUpdate } from './dto/serviceforupdate.dto';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createService(
    @Body()
    serviceForCreate: ServiceForCreate,
    @UploadedFile() file: Express.Multer.File,
  ) {
    serviceForCreate.img_path = file.path.split('\\')[1];
    return await this.serviceService.createService(serviceForCreate);
  }

  @Get()
  async getAllproducts(@Sorting() sort: Sort, @SortingBy() sortby: string) {
    return await this.serviceService.getAll(sort, sortby);
  }

  // @Get('search/:value')
  // async searchProducts(@Param('value') valueForSearch: string) {
  //   console.log('here');
  // const name = valueForSearch;
  // const author = valueForSearch;

  // return await this.serviceService.findByValue(name, author);
  // }

  @Post('search')
  async searchServices(
    @Sorting() sort: Sort,
    @SortingBy() sortby: string,
    @Body() filters: any,
  ) {
    return await this.serviceService.findByFilters(filters, sort, sortby);
  }

  @UseGuards(JwtAuthGuard)
  @Post('makereview/:serviceId')
  @HttpCode(HttpStatus.CREATED)
  async makeReviewForService(
    @Param('serviceId') serviceId,
    @CurrentUser() currentUser: CurrentUserInfo,
    @Body(new JoiValidationPipe(reviewFromUserSchema)) review: ReviewFromUser,
  ) {
    return await this.serviceService.makeReview(
      currentUser.userId,
      currentUser.email,
      serviceId,
      review,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch(':id')
  async updateService(
    @Param('id') serviceId: string,
    @Body()
    serviceForUpdate: ServiceForUpdate,
    @UploadedFile() file: any,
  ) {
    return await this.serviceService.updateService(
      serviceId,
      serviceForUpdate,
      file.path.split('\\')[1] + '.' + file.originalname.split('.')[1],
    );
  }

  @Get('/:id')
  async getService(@Param('id') id: string) {
    return await this.serviceService.getOne(id);
  }
}
