import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../database/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create({
    userId,
    borderId,
    toppingId,
    sizeId,
    amount,
  }: {
    userId: number;
    borderId: number;
    toppingId: number;
    sizeId: number;
    amount: number;
  }) {
    const order = this.orderRepository.create({
      userId,
      borderId,
      toppingId,
      sizeId,
      amount,
    });

    return this.orderRepository.save(order);
  }

  async listOrdersByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: { user: true, topping: true, border: true, size: true },
      order: {
        id: 'ASC',
      },
    });
  }
}
