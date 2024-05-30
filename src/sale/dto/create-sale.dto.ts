import { Sale } from '../entities/sale.entity';
import {
    IsNumber,
    IsInt,
    Min,
    IsDateString,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateSaleDto extends Sale {
    @IsNumber()
    id_product: number;
    
    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @MaxLength(100)
    client_name: string;

    @IsDateString()
    date: Date;
}