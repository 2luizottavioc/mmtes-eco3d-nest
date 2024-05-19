import { Product } from "src/product/entities/product.entity";

export class Sale {
    id?: number;
    product?: Product;
    quantity: number;
    sale_value: number;
    client_name: string;
    date: Date;
}