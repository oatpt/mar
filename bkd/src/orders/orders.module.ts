import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory, Orders } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory,Orders]),],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
