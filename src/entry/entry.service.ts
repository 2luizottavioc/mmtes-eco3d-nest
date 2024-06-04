import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Entry } from './entities/entry.entity';
import { Prisma } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const product = await this.prisma.product.findUnique({
      where: { id: createEntryDto.id_product },
    });

    if(!product) {
      throw new NotFoundException(`Product with ID ${createEntryDto.id_product} not found`)
    }

    const data: Prisma.ProductEntryCreateInput = {
      quantity: createEntryDto.quantity,
      cost_price: product.sale_price * createEntryDto.quantity,
      provider: createEntryDto.provider,
      date: new Date(createEntryDto.date).toISOString(),
      product: {
        connect: {
          id: createEntryDto.id_product
        },
      }
    };
    
    const createdEntry = await this.prisma.productEntry.create({ data })

    await this.prisma.product.update({
      where: { id: createEntryDto.id_product },
      data: {
        stock_quantity: product.stock_quantity + createEntryDto.quantity
      }
    })

    return {
      ...createdEntry
    };
  }

  async findAll(user: User) {
    return await this.prisma.productEntry.findMany({
      where: { product: { id_user: user.id } },
      include: { product: true }
    }) || [];
  }

  async findOne(id: number, user: User) {
    return await this.prisma.productEntry.findUnique({ 
      where: { id, product: { id_user: user.id } },
      include: { product: true }
    }) || {};
  }

  async update(id: number, updateEntryDto: UpdateEntryDto, user: User) {
    const product = await this.prisma.product.findUnique({
      where: { id: updateEntryDto.id_product, id_user: user.id },
    });

    if(!product) {
      throw new NotFoundException(`Product with ID ${updateEntryDto.id_product} not found`)
    }

    const { ...data } = updateEntryDto;

    const originalEntry = await this.prisma.productEntry.findUnique({
      where: { id },
    });

    const updatedEntry = await this.prisma.productEntry.update({
      where: { id },
      data,
    });

    const originalQuantity = originalEntry.quantity;  
    const newQuantity = updatedEntry.quantity;  
    const diffQuantity = newQuantity - originalQuantity;  
    
    const productChanged = originalEntry.id_product !== updatedEntry.id_product;
    if(productChanged) {
      const originalProduct = await this.prisma.product.findUnique({
        where: { id: originalEntry.id_product },
      })

      await this.prisma.product.update({
        where: { id: originalProduct.id },
        data: {
          stock_quantity: originalProduct.stock_quantity - originalQuantity
        }
      })

      await this.prisma.product.update({
        where: { id: product.id },
        data: {
          stock_quantity: product.stock_quantity + newQuantity
        }
      })

      return {
        ...updatedEntry
      }
    }
    
    if(diffQuantity) {
      await this.prisma.product.update({
        where: { id: product.id },
        data: {
          stock_quantity: product.stock_quantity + diffQuantity
        }
      })
    }

    return {
      ...updatedEntry
    };
  }

  async remove(id: number, user: User) {
    const entry = await this.prisma.productEntry.findUnique({
      where: { id, product: { id_user: user.id } },
    })

    if(!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`)
    }

    const product = await this.prisma.product.findUnique({
      where: { id: entry.id_product },
    });

    const deletedEntry = await this.prisma.productEntry.delete({ where: { id } });

    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        stock_quantity: product.stock_quantity - entry.quantity
      }
    })

    return deletedEntry
  }
}
