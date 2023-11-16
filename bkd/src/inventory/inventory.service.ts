import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/typeorm/inventory.entity';
import { Repository } from 'typeorm';
import { inventoryType } from './interface/inventory.interface';

@Injectable()
export class InventoryService {
    constructor(@InjectRepository(Inventory) private repositoryInventory: Repository<Inventory>) { 
    }

    async getall():Promise<Inventory[]>{
        const res = await this.repositoryInventory.find()
        console.log(res.sort((a,b)=>parseInt(a.ProductID)-parseInt(b.ProductID)));
        
        return res; 
    }
    async create(data:inventoryType) {
        data.Profit=data.Price*0.3;
        
        const inventorydto = this.repositoryInventory.create(data);
        await this.repositoryInventory.save(inventorydto);
      }
    async delete(id:string ) {

        const inventory = await this.repositoryInventory.findOne({where:{ProductID:id}});
        await this.repositoryInventory.remove(inventory);
      }
      async update(id:string,data:inventoryType) {
        const inventory = await this.repositoryInventory.findOne({where:{ProductID:id}});
        inventory.Name=data.Name;
        inventory.Onhand=data.Onhand;
        inventory.Category=data.Category;
        inventory.Price=data.Price;
        inventory.Profit=data.Price*0.3;
       console.log(inventory);
       console.log(data);
        await this.repositoryInventory.save(inventory);
      }

}
