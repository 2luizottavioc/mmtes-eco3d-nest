import { User } from "src/user/entities/user.entity";

export class Product {
    id?: number;
    user?: User;
    name: string;
    sale_price: number;
    stock_quantity: number;
    description: string;
}