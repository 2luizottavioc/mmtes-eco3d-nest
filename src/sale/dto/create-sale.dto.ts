import { Sale } from '../entities/sale.entity';
import {
    IsNumber,
    IsInt,
    Min,
    IsDateString,
    IsString,
    MaxLength,
    IsPositive,
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

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    sale_value: number;
}