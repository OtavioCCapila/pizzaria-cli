import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PizzaBorder {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
