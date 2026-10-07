import { Injectable } from '@nestjs/common';
import { input, password } from '@inquirer/prompts';
import ora from 'ora';
import { CliState } from '../cli-state.enum';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class RegisterMenu {
  constructor(private readonly authService: AuthService) {}

  async show() {
    console.clear();

    console.log('=== CADASTRO ===\n');

    const name = await input({
      message: 'Digite seu nome:',
    });

    const email = await input({
      message: 'Digite seu email:',
    });

    const userPassword = await password({
      message: 'Digite sua senha:',
      mask: '*',
    });

    const confirmPassword = await password({
      message: 'Confirme sua senha:',
      mask: '*',
    });

    if (userPassword !== confirmPassword) {
      console.log('As senhas não coincidem. Tente novamente.');
      await this.wait();
      return CliState.REGISTER;
    }

    const spinner = ora({ text: 'Cadastrando...', color: 'green' }).start();

    try {
      await this.authService.register(name, email, userPassword);
      spinner.succeed('Cadastro realizado com sucesso!');
      await this.wait();
      return CliState.MAIN;
    } catch (error) {
      spinner.fail('Erro ao cadastrar usuário');
      throw error;
    }
  }

  private async wait(): Promise<void> {
    await input({
      message: 'Pressione Enter para continuar...',
    });
  }
}
