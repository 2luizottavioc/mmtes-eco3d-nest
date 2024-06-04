import { IsNumber, IsInt, Min, IsString, MaxLength, IsDateString, IsPositive, } from 'class-validator';

export class UpdateSaleDto {
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
