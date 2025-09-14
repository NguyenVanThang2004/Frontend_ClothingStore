import { CategoryDTO } from "./category";

export interface ProductDTO {
    id: number;
    name: string;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: CategoryDTO;

}