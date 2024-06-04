import { IsNumber, IsInt, Min, IsDate, IsString, MaxLength, IsPositive, IsDateString } from 'class-validator';

export class UpdateEntryDto {
    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @MaxLength(100)
    provider: string;

    @IsNumber()
    id_product: number;

    @IsDateString()
    date: Date;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    cost_price: number;
}
