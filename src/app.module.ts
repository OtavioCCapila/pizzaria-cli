import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliModule } from './modules/cli/cli.module';
import { UserModule } from './modules/user/user.module';
import { databaseConfig } from './database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { PizzaModule } from './modules/pizza/pizza.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...databaseConfig,
      autoLoadEntities: true,
    }),
    CliModule,
    UserModule,
    AuthModule,
    PizzaModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
