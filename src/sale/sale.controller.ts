import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto, @CurrentUser() user: User) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.saleService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() user: User) {
    return this.saleService.findOne(id, user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto, @CurrentUser() user: User) {
    return this.saleService.update(id, updateSaleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @CurrentUser() user: User) {
    return this.saleService.remove(id, user);
  }
}
