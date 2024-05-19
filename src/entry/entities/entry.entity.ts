import { Product } from "@prisma/client";

export class Entry {
    id?: number;
    product?: Product;
    quantity: number;
    cost_price: number;
    provider: string;
    date: Date;
}