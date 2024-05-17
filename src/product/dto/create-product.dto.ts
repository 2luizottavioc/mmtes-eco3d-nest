import { User } from 'src/user/entities/user.entity';
import { Product } from '../entities/product.entity';
import {
    IsInt,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateProductDto extends Product {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsString()
    @MaxLength(200)
    description: string;

    @IsInt()
    @Min(0)
    stock_quantity: number;

    @IsNumber()
    @Min(0.01)
    sale_price: number;

}