import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder({
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
    return this.orderRepository.create({
      userId,
      borderId,
      toppingId,
      sizeId,
      amount,
    });
  }

  async listOrderByUser(userId: number) {
    return this.orderRepository.listOrdersByUser(userId);
  }
}
