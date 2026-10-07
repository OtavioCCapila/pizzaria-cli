import { Injectable } from '@nestjs/common';
import { CliState } from './cli-state.enum';
import { MainMenu } from './menu/main.menu';
import { LoginMenu } from './menu/login.menu';
import { RegisterMenu } from './menu/register.menu';
import { AuthenticatedMenu } from './menu/authenticated.menu';
import { MyAccountMenu } from './menu/my-account.menu';
import { OrderMenu } from './menu/order.menu';
import { MyOrdersMenu } from './menu/my-orders.menu';

@Injectable()
export class CliService {
  constructor(
    private readonly mainMenu: MainMenu,
    private readonly loginMenu: LoginMenu,
    private readonly registerMenu: RegisterMenu,
    private readonly authenticatedMenu: AuthenticatedMenu,
    private readonly myAccountMenu: MyAccountMenu,
    private readonly orderMenu: OrderMenu,
    private readonly myOrdersMenu: MyOrdersMenu,
  ) {}

  async run(): Promise<void> {
    let state = CliState.MAIN;
    console.clear();

    while (state !== CliState.EXIT) {
      state = await this.handleState(state);
    }
  }

  private async handleState(state: CliState): Promise<CliState> {
    switch (state) {
      case CliState.MAIN:
        return await this.mainMenu.show();
      case CliState.LOGIN:
        return await this.loginMenu.show();
      case CliState.REGISTER:
        return await this.registerMenu.show();
      case CliState.AUTHENTICATED:
        return await this.authenticatedMenu.show();
      case CliState.ORDER:
        return await this.orderMenu.show();
      case CliState.MY_ORDERS:
        return await this.myOrdersMenu.show();
      case CliState.MY_ACCOUNT:
        return await this.myAccountMenu.show();
      case CliState.EXIT:
        return CliState.EXIT;
    }
  }
}
