import { Product } from "src/product/entities/product.entity";

export class Entry {
    id?: number;
    product?: Product;
    quantity: number;
    cost_price: number;
    provider: string;
    date: Date;
}