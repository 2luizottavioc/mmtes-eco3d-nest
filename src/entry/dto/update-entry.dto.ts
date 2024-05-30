import { IsNumber, IsInt, Min, IsDate, IsString, MaxLength } from 'class-validator';

export class UpdateEntryDto {
    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @MaxLength(100)
    provider: string;

    @IsNumber()
    id_product: number;
}
