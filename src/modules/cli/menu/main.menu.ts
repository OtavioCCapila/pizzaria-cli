import { Injectable } from '@nestjs/common';
import { select } from '@inquirer/prompts';
import { CliState } from '../cli-state.enum';
import { BannerService } from '../banner.service';

@Injectable()
export class MainMenu {
  constructor(private readonly bannerService: BannerService) {}

  async show() {
    this.bannerService.show('Pizzaria do Tavim', true);

    const option = await select({
      message: 'O que você deseja fazer?',
      choices: [
        { name: 'Login', value: 'login' },
        { name: 'Registrar', value: 'register' },
        { name: 'Sair', value: 'exit' },
      ],
    });

    switch (option) {
      case 'login':
        return CliState.LOGIN;
      case 'register':
        return CliState.REGISTER;
      case 'exit':
        return CliState.EXIT;
    }
  }
}
