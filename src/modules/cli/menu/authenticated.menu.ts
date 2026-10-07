import { Injectable } from '@nestjs/common';
import { select } from '@inquirer/prompts';
import { CliState } from '../cli-state.enum';
import { SessionService } from '../../auth/session.service';

@Injectable()
export class AuthenticatedMenu {
  constructor(private readonly sessionService: SessionService) {}

  async show() {
    console.clear();
    console.log('=== MENU AUTENTICADO ===');
    console.log('Bem-vindo, ' + this.sessionService.getUser()?.name + '!');

    const option = await select({
      message: 'O que você deseja fazer?',
      choices: [
        { name: 'Realizar pedido', value: 'order' },
        { name: 'Meus Pedidos', value: 'my_orders' },
        { name: 'Minha conta', value: 'my_account' },
        { name: 'Sair', value: 'exit' },
      ],
    });

    switch (option) {
      case 'order':
        return CliState.ORDER;
      case 'my_orders':
        return CliState.MY_ORDERS;
      case 'my_account':
        return CliState.MY_ACCOUNT;
      case 'exit':
        return CliState.EXIT;
    }
  }
}
