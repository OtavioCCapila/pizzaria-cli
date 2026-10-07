import { Injectable } from '@nestjs/common';
import figlet from 'figlet';

@Injectable()
export class BannerService {
  show(message: string, showWelcomeMessage: boolean): void {
    console.clear();
    console.log(
      figlet.textSync(message, {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    );

    if (showWelcomeMessage) {
      console.log('Bem-vindo à nossa pizzaria! 🍕\n');
    }
  }
}
