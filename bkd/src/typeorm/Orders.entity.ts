import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'OrdersID',
      })
    OrdersID:string;
    
    @Column('decimal', { precision: 6, scale: 2 })
    Price:number;
    
    @Column({ default: 0 })
    Date:number;

    @Column({ default: 0 })
    Unit:number;
    
    @ManyToOne(()=>Inventory,inventory=>inventory.OrdersIDs)
    ProductID:Inventory;


}