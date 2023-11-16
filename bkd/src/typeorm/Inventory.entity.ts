import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'ProductID',
      })
    ProductID:string;

    @Column({ length: 500 })
    Name:string;

    @Column()
    Category:string;

    @Column('decimal', { precision: 6, scale: 2 })
    Price:number;
    
    @Column('decimal', { precision: 6, scale: 2 })
    Profit: number;
    
    @Column({ default: 0 })
    Onhand:number;

    @Column({ default: 0 })
    TotalSold:number;

    @OneToMany(()=>Orders,orders=>orders.ProductID)
    OrdersIDs:Orders[];
}