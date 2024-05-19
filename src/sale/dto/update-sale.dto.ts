import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';
import { IsNumber, IsInt, Min, } from 'class-validator';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {

    @IsInt()
    @Min(0)
    quantity: number;

    @IsNumber()
    id_product: number;

}
