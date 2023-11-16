import { Orders } from 'src/typeorm';
import { ordersType } from './interface/orders.interface';
import { OrdersService } from './orders.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
@Controller('orders')
export class OrdersController {
    constructor(private readonly inventoryService: OrdersService) { }
    @Get('')
    async getall(): Promise<Orders[]> {
        return await this.inventoryService.getall();
    }
    @Post('')
    async create(@Body() data: ordersType) {
        const res =  await this.inventoryService.create(data);
        if (res)
            return res
        throw new NotFoundException();
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.inventoryService.delete(id);
    }
    @Post('update')
    async update(@Body() data: ordersType) {
        const res = await this.inventoryService.update(data.ProductID, data);
        if (res)
            return res
        throw new NotFoundException();
    }
}
