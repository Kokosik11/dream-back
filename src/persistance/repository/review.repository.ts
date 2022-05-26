import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { StatsInfo } from 'src/types/types';
import { NotFound } from 'src/errors/errors';

@Injectable()
export class ReviewRepository
  implements
    Repository<
      string,
      Prisma.ReviewCreateInput,
      Prisma.ReviewUpdateInput,
      Review
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return await this.prisma.review.create({
      data,
    });
  }
  async update(id: string, data: Prisma.ReviewUpdateInput): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    const review = await this.prisma.review.delete({
      where: {
        id: Number(id),
      },
    });

    if (review) {
      return true;
    }

    throw new NotFound('Not found review for delete');
  }
  async findOne(id: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }

  async deleteByRecordOrUserId(id: string) {
    await this.prisma.review.deleteMany({
      where: {
        // OR: [
        //   {
        userId: Number(id),
        // },
        //   {
        //     productId: id,
        //   },
        // ],
      },
    });
  }

  // async getStatsOfRecord(productId: string): Promise<StatsInfo> {
  //   const aggregations = await this.prisma.review.aggregate({
  //     _count: {
  //       productId: true,
  //     },
  //     _sum: {
  //       raiting: true,
  //     },
  //     where: {
  //       productId: productId,
  //     },
  //   });

  //   return {
  //     count: aggregations._count.productId,
  //     sum: aggregations._sum.raiting,
  //   } as StatsInfo;
  // }
}