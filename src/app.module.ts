import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule/auth.module';
import { AdminModule } from './modules/AdminModule/admin.module';
import { DbModule } from './persistance/dbmodule.module';
import { UserModule } from './modules/UserModule/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    DbModule,
    AuthModule,
    AdminModule,
    UserModule,
    // PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
