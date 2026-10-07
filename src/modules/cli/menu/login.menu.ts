import { Injectable } from '@nestjs/common';
import { input, password } from '@inquirer/prompts';
import ora from 'ora';
import { CliState } from '../cli-state.enum';
import { AuthService } from '../../auth/auth.service';
import { BannerService } from '../banner.service';

@Injectable()
export class LoginMenu {
  constructor(
    private readonly bannerService: BannerService,
    private readonly authService: AuthService,
  ) {}

  async show() {
    this.bannerService.show('Login', false);

    const email = await input({
      message: 'Digite seu email:',
    });

    const userPassword = await password({
      message: 'Digite sua senha:',
      mask: '*',
    });

    const spinner = ora({ text: 'Autenticando...', color: 'green' }).start();

    try {
      await this.authService.login(email, userPassword);
      spinner.succeed('Login realizado com sucesso!');
      return CliState.AUTHENTICATED;
    } catch (error) {
      spinner.fail('Credenciais inválidas');
      throw error;
    }
  }
}
