import { Type } from 'class-transformer';
import { Sale } from '../entities/sale.entity';
import {
    IsNumber,
    IsInt,
    Min,
} from 'class-validator';

export class CreateSaleDto extends Sale {

    @IsInt()
    @Min(0)
    quantity: number;

    @IsNumber()
    id_product: number;

}