import { IsNumber, IsInt, Min, IsString, MaxLength, IsDateString, } from 'class-validator';

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
}
