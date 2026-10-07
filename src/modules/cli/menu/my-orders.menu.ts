import { Injectable } from '@nestjs/common';
import { select } from '@inquirer/prompts';
import Table from 'cli-table3';

import { CliState } from '../cli-state.enum';
import { SessionService } from '../../auth/session.service';
import { OrderService } from '../../order/order.service';
import { BannerService } from '../banner.service';

@Injectable()
export class MyOrdersMenu {
  constructor(
    private readonly bannerService: BannerService,
    private readonly sessionService: SessionService,
    private readonly orderService: OrderService,
  ) {}

  async show() {
    this.bannerService.show('Meus Pedidos', false);

    const table = new Table({
      head: ['ID', 'Tamanho', 'Sabor', 'Borda', 'Total'],
      colWidths: [10, 10, 20, 20, 10],
    });

    const user = this.sessionService.getUser();
    if (!user) {
      throw new Error('Não está autenticado');
    }

    const orders = await this.orderService.listOrderByUser(user.id);
    const mappedOrders = orders.map((order) => [
      order.id,
      order.size.name,
      order.topping.name,
      order.border.name,
      `R$ ${order.amount}`,
    ]);

    table.push(...mappedOrders);

    console.log(table.toString());

    const option = await select({
      message: 'O que você deseja fazer?',
      choices: [{ name: 'Voltar', value: 'return' }],
    });

    if (option === 'return') {
      return CliState.AUTHENTICATED;
    }

    return CliState.EXIT;
  }
}
