import { User } from 'src/user/entities/user.entity';
import { Product } from '../entities/product.entity';
import {
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateProductDto extends Product {

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    name: string;

    @IsString()
    @MaxLength(200)
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    sale_price: number;
}