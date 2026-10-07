import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PizzaTopping } from './pizza-topping.entity';
import { PizzaSize } from './pizza-size.entity';
import { PizzaBorder } from './pizza-border.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  userId: number;

  @Column()
  toppingId: number;

  @Column()
  sizeId: number;

  @Column()
  borderId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => PizzaTopping)
  @JoinColumn({ name: 'toppingId' })
  topping: PizzaTopping;

  @ManyToOne(() => PizzaSize)
  @JoinColumn({ name: 'sizeId' })
  size: PizzaSize;

  @ManyToOne(() => PizzaBorder)
  @JoinColumn({ name: 'borderId' })
  border: PizzaBorder;
}
