import { Injectable } from '@nestjs/common';
import { select } from '@inquirer/prompts';
import Table from 'cli-table3';

import { CliState } from '../cli-state.enum';
import { SessionService } from '../../auth/session.service';
import { BannerService } from '../banner.service';

@Injectable()
export class MyAccountMenu {
  constructor(
    private readonly bannerService: BannerService,
    private readonly sessionService: SessionService,
  ) {}

  async show() {
    this.bannerService.show('Minha conta', false);

    const table = new Table({
      head: ['ID', 'Nome', 'Email', 'Data de Cadastro'],
      colWidths: [10, 20, 30, 20],
    });

    const user = this.sessionService.getUser();

    table.push([
      user?.id,
      user?.name,
      user?.email,
      user?.createdAt.toISOString().split('T')[0],
    ]);

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
