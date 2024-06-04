import { Entry } from '../entities/entry.entity';
import {
    IsString,
    IsNumber,
    IsInt,
    Min,
    IsDate,
    MaxLength,
    IsDecimal,
    IsPositive,
    IsDateString,
    IsISO8601
} from 'class-validator';

export class CreateEntryDto extends Entry {
    @IsNumber()
    id_product: number;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @MaxLength(100)
    provider: string;

    @IsDateString()
    date: Date;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    cost_price: number;
}