import { Injectable } from '@nestjs/common';
import { confirm, select } from '@inquirer/prompts';
import ora from 'ora';
import { CliState } from '../cli-state.enum';
import { BannerService } from '../banner.service';
import { SessionService } from '../../auth/session.service';
import { PizzaRepository } from '../../pizza/pizza.repository';
import { OrderService } from '../../order/order.service';

@Injectable()
export class OrderMenu {
  constructor(
    private readonly bannerService: BannerService,
    private readonly sessionService: SessionService,
    private readonly pizzaRepository: PizzaRepository,
    private readonly orderService: OrderService,
  ) {}

  async show() {
    const user = this.sessionService.getUser();
    if (!user) {
      throw new Error('Não autenticado');
    }

    this.bannerService.show('Monte sua pizza', false);

    const [borders, sizes, toppings] = await Promise.all([
      this.pizzaRepository.listBorders(),
      this.pizzaRepository.listSizes(),
      this.pizzaRepository.listToppings(),
    ]);

    const selectedSize = await select({
      message: 'Escolha o tamanho da pizza:',
      choices: sizes.map((size) => ({
        name: size.name,
        value: size,
        description: `R$ ${size.price}`,
      })),
    });

    const selectedBorder = await select({
      message: 'Escolha a borda da pizza:',
      choices: borders.map((border) => ({
        name: border.name,
        value: border,
        description: `R$ ${border.price}`,
      })),
    });

    const selectedToppings = await select({
      message: 'Escolha o sabor da pizza:',
      choices: toppings.map((topping) => ({
        name: topping.name,
        value: topping,
        description: `R$ ${topping.price}`,
      })),
    });

    const confirmOrder = await confirm({
      message: `Confirma o pedido da pizza ${selectedSize.name} / ${selectedBorder.name} e sabor ${selectedToppings.name}?`,
      theme: {
        keywords: {
          yes: 'Sim',
          no: 'Não',
        },
      },
    });

    if (confirmOrder) {
      const spinner = ora({
        text: 'Criando pedido...',
        color: 'green',
      }).start();
      const totalAmount =
        Number(selectedBorder.price) +
        Number(selectedSize.price) +
        Number(selectedToppings.price);

      try {
        await this.orderService.createOrder({
          userId: user.id,
          borderId: selectedBorder.id,
          toppingId: selectedToppings.id,
          sizeId: selectedSize.id,
          amount: totalAmount,
        });
        spinner.succeed('Pedido criado com sucesso!');
        return CliState.AUTHENTICATED;
      } catch (err) {
        spinner.fail('Falha ao criar pedido');
        throw err;
      }
    }

    return CliState.AUTHENTICATED;
  }
}
