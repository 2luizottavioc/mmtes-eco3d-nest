import { Type } from 'class-transformer';
import { Entry } from '../entities/entry.entity';
import {
    IsString,
    IsNumber,
    IsInt,
    Min,
    IsDate,
    MaxLength
} from 'class-validator';

export class CreateEntryDto extends Entry {

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @MaxLength(100)
    provider: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    id_product: number;

}