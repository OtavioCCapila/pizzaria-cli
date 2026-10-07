import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaBorder } from '../../database/entities/pizza-border.entity';
import { PizzaSize } from '../../database/entities/pizza-size.entity';
import { PizzaTopping } from '../../database/entities/pizza-topping.entity';
import { PizzaRepository } from './pizza.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaBorder, PizzaSize, PizzaTopping])],
  providers: [PizzaRepository],
  exports: [PizzaRepository],
})
export class PizzaModule {}
