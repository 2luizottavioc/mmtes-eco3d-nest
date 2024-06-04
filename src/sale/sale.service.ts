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

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const product = await this.prisma.product.findUnique({
      where: { id: createSaleDto.id_product },
    });

    if(!product) {
      throw new NotFoundException(`Product with ID ${createSaleDto.id_product} not found`)
    }

    const newProductStock = product.stock_quantity - createSaleDto.quantity;

    if(newProductStock < 0) {
      throw new NotFoundException(`Not enough stock for product with ID ${createSaleDto.id_product}`)
    }

    const data: Prisma.ProductSalesCreateInput = {
      quantity: createSaleDto.quantity,
      sale_value: product.sale_price * createSaleDto.quantity,
      client_name: createSaleDto.client_name,
      date: new Date(createSaleDto.date).toISOString(),
      product: {
        connect: {
          id: createSaleDto.id_product
        },
      }
    };
    
    const createdSale = await this.prisma.productSales.create({ data })

    await this.prisma.product.update({
      where: { id: createSaleDto.id_product },
      data: {
        stock_quantity: newProductStock
      }
    })

    return {
      ...createdSale
    };
  }

  async findAll(user: User) {
    return await this.prisma.productSales.findMany({
      where: { product: { id_user: user.id } },
      include: { product: true }
    }) || [];
  }

  async findOne(id: number, user: User) {
    return await this.prisma.productSales.findUnique({ 
      where: { id, product: { id_user: user.id } }, 
      include: { product: true } 
    }) || {};
  }

  async update(id: number, updateSaleDto: UpdateSaleDto, user: User) {
    const product = await this.prisma.product.findUnique({
      where: { id: updateSaleDto.id_product, id_user: user.id },
    });

    if(!product) {
      throw new NotFoundException(`Product with ID ${updateSaleDto.id_product} not found`)
    }

    const { ...data} = updateSaleDto;
    const newSaleValue = product.sale_price * updateSaleDto.quantity
    const newDate = new Date(updateSaleDto.date).toISOString();

    const originalSale = await this.prisma.productSales.findUnique({
      where: { id },
    });

    const updatedSale = await this.prisma.productSales.update({
      where: { id },
      data: {
        ...data,
        sale_value: newSaleValue,
        date: newDate
      },
    });

    const originalQuantity = originalSale.quantity;
    const newQuantity = updatedSale.quantity;
    const diffQuantity = newQuantity - originalQuantity;

    if(product.stock_quantity < diffQuantity){
      throw new Error('Not enough stock available for the update');
    }

    const productChanged = originalSale.id_product !== updatedSale.id_product;

    if(productChanged) {
      const originalProduct = await this.prisma.product.findUnique({
        where: { id: originalSale.id_product },
      })

      await this.prisma.product.update({
        where: { id: originalProduct.id },
        data: {
          stock_quantity: originalProduct.stock_quantity + originalQuantity
        }
      })

      await this.prisma.product.update({
        where: { id: updatedSale.id_product },
        data: {
          stock_quantity: product.stock_quantity - newQuantity
        }
      })

      return {
        ...updatedSale
      }
    }

    if(diffQuantity) {
      await this.prisma.product.update({
        where: { id: product.id },
        data: {
          stock_quantity: product.stock_quantity - diffQuantity
        }
      })
    }

    return {
      ...updatedSale
    };
  }

  async remove(id: number, user: User) {
    const sale = await this.prisma.productSales.findUnique({
      where: { id, product: { id_user: user.id } },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`)
    }

    const product = await this.prisma.product.findUnique({
      where: { id: sale.id_product },
    });

    const deletedSale = await this.prisma.productSales.delete({ where: { id } });

    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        stock_quantity: product.stock_quantity + sale.quantity
      }
    })

    return deletedSale
  }
}
