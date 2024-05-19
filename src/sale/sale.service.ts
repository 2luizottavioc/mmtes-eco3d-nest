import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sale } from './entities/sale.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSaleDto: CreateSaleDto, user: User): Promise<Sale> {

    const product = await this.prisma.product.findUnique({
      where: { id: createSaleDto.id_product },
    });

    if(!product){
      throw new NotFoundException(`Product with ID ${createSaleDto.id_product} not found`)
    }
    createSaleDto.sale_value = product.sale_price * createSaleDto.quantity;
    createSaleDto.date = new Date();
    createSaleDto.client_name = user.name;

    const data: Prisma.ProductSalesCreateInput = {
      quantity: createSaleDto.quantity,
      sale_value: createSaleDto.sale_value,
      client_name: createSaleDto.client_name,
      date: createSaleDto.date,
      product: {
        connect: {
          id: createSaleDto.id_product
        },
      }
    };
    
    const createdSale = await this.prisma.productSales.create({ data })

    return {
      ...createdSale
    };
  }

  async findAll() {
    return await this.prisma.productSales.findMany() || [];
  }

  async findOne(id: number) {
    return await this.prisma.productSales.findUnique({ where: { id } }) || {};
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    
    const { product, ...data} = updateSaleDto;

    const updatedSale = await this.prisma.productSales.update({
      where: { id },
      data,
    });

    return {
      ...updatedSale
    };
  }

  remove(id: number) {
    return this.prisma.productSales.delete({ where: { id } });
  }
}
