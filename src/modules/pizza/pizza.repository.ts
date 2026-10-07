import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaBorder } from '../../database/entities/pizza-border.entity';
import { Repository } from 'typeorm';
import { PizzaTopping } from '../../database/entities/pizza-topping.entity';
import { PizzaSize } from '../../database/entities/pizza-size.entity';

@Injectable()
export class PizzaRepository {
  constructor(
    @InjectRepository(PizzaBorder)
    private readonly pizzaBorderRepository: Repository<PizzaBorder>,
    @InjectRepository(PizzaSize)
    private readonly pizzaSizeRepository: Repository<PizzaSize>,
    @InjectRepository(PizzaTopping)
    private readonly pizzaToppingRepository: Repository<PizzaTopping>,
  ) {}

  listBorders(): Promise<PizzaBorder[]> {
    return this.pizzaBorderRepository.find();
  }

  listSizes(): Promise<PizzaSize[]> {
    return this.pizzaSizeRepository.find();
  }

  listToppings(): Promise<PizzaTopping[]> {
    return this.pizzaToppingRepository.find();
  }
}
