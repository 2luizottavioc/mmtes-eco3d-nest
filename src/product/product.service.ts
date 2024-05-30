import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    if(!user){
      throw new NotFoundException(`User with id ${user.id} not found`);
    }

    const data: Prisma.ProductCreateInput = {
        name: createProductDto.name,
        sale_price: createProductDto.sale_price,
        stock_quantity: 0,
        description: createProductDto.description,
        user: {
          connect: { id: user.id },
        }
    };

    const createdProduct = await this.prisma.product.create({ data });

    return {
      ...createdProduct
    };
  }

  async findAll() {
    return await this.prisma.product.findMany() || [];
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id } }) || {};
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { user, ...data } = updateProductDto;

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data,
    });

    return {
      ...updatedProduct
    };
  }

  async remove(id: number) {
    const deletedEntry = await this.prisma.productEntry.deleteMany({ where: { id_product: id } });
    const deletedSales = await this.prisma.productSales.deleteMany({ where: { id_product: id } });
    const deletedProduct = await this.prisma.product.delete({ where: { id } });
    
    return {
      deleted_product: deletedProduct,
      deleted_entries: deletedEntry,
      deleted_sales: deletedSales
    }
  }
}
