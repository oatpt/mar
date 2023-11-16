import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from 'src/typeorm/inventory.entity';
import { inventoryType } from './interface/inventory.interface';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}
    @Get('')
    async getall():Promise<Inventory[]>{
        return await this.inventoryService.getall();
    }
    @Post('')
    async create(@Body() data: inventoryType){
        return await this.inventoryService.create(data);
    }
    @Delete('/:id')
    async delete(@Param('id')id:string){
        return await this.inventoryService.delete(id);
    }
    @Post('update')
    async update(@Body() data: inventoryType){
        return await this.inventoryService.update(data.ProductID,data);
    }
}
