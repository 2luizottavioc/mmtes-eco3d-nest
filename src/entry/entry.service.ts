import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Entry } from './entities/entry.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {

    const product = await this.prisma.product.findUnique({
      where: { id: createEntryDto.id_product },
    });

    if(!product){
      throw new NotFoundException(`Product with ID ${createEntryDto.id_product} not found`)
    }
    createEntryDto.cost_price = product.sale_price * createEntryDto.quantity;
    createEntryDto.date = new Date();

    const data: Prisma.ProductEntryCreateInput = {
      quantity: createEntryDto.quantity,
      cost_price: createEntryDto.cost_price,
      provider: createEntryDto.provider,
      date: createEntryDto.date,
      product: {
        connect: {
          id: createEntryDto.id_product
        },
      }
    };
    
    const createdEntry = await this.prisma.productEntry.create({ data })

    return {
      ...createdEntry
    };
  }

  async findAll() {
    return await this.prisma.productEntry.findMany() || [];
  }

  async findOne(id: number) {
    return await this.prisma.productEntry.findUnique({ where: { id } }) || {};
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    
    const { product, ...data } = updateEntryDto;

    const updatedEntry = await this.prisma.productEntry.update({
      where: { id },
      data,
    });

    return {
      ...updatedEntry
    };
  }

  remove(id: number) {
    return this.prisma.productEntry.delete({ where: { id } });
  }
}
