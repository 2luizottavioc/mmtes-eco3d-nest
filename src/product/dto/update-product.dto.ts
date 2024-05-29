import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsString()
    @MaxLength(200)
    description: string;

    @IsNumber()
    @Min(0.01)
    sale_price: number;
}
