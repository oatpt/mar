import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory, Orders } from 'src/typeorm';
import { Repository } from 'typeorm';
import { ordersType } from './interface/orders.interface';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Inventory) private repositoryInventory: Repository<Inventory>,
        @InjectRepository(Orders) private repositoryOrders: Repository<Orders>) {
    }

    async getall(): Promise<Orders[]> {
        const res = await this.repositoryOrders.find({relations:['ProductID']});
        console.log(res.sort((a, b) => parseInt(a.OrdersID) - parseInt(b.OrdersID)));
        return res;
    }
    async create(data: ordersType) {
        const inventory = await this.repositoryInventory.findOne({ where: { ProductID: data.ProductID } });
        if(!inventory)
            return false
        const time=new Date();
        let dto = {
            ...data,
            Date:time.getTime(),
            Price:inventory.Price,
            ProductID: inventory
        }
        const ordersdto = this.repositoryOrders.create(dto);
        inventory.TotalSold+=dto.Unit;
        inventory.Onhand-=dto.Unit;
        if(inventory.Onhand<0)
            return false
        await this.repositoryOrders.save(ordersdto);
        await this.repositoryInventory.save(inventory);
    }
    async delete(id: string) {

        const ordersdto = await this.repositoryOrders.findOne({ where: { OrdersID: id } });
        await this.repositoryOrders.remove(ordersdto);
    }
    async update(id: string, data: ordersType) {
        const inventory = await this.repositoryInventory.findOne({ where: { ProductID: data.ProductID } });
        const ordersdto = await this.repositoryOrders.findOne({ where: { OrdersID: id } });
        ordersdto.Date = data.Date;
        ordersdto.Unit = data.Unit;
        ordersdto.Price = inventory.Price;
        ordersdto.ProductID=inventory;
        if(inventory.Onhand<0)
            return false
        await this.repositoryOrders.save(ordersdto);
        await this.repositoryInventory.save(inventory);
    }
}
