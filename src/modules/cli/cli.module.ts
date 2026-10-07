import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { MainMenu } from './menu/main.menu';
import { BannerService } from './banner.service';
import { LoginMenu } from './menu/login.menu';
import { RegisterMenu } from './menu/register.menu';
import { AuthenticatedMenu } from './menu/authenticated.menu';
import { AuthModule } from '../auth/auth.module';
import { MyAccountMenu } from './menu/my-account.menu';
import { OrderMenu } from './menu/order.menu';
import { PizzaModule } from '../pizza/pizza.module';
import { OrderModule } from '../order/order.module';
import { MyOrdersMenu } from './menu/my-orders.menu';

@Module({
  imports: [AuthModule, PizzaModule, OrderModule],
  providers: [
    CliService,
    BannerService,
    MainMenu,
    LoginMenu,
    RegisterMenu,
    AuthenticatedMenu,
    MyAccountMenu,
    OrderMenu,
    MyOrdersMenu,
  ],
})
export class CliModule {}
