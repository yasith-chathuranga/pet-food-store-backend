export default class DogFood {
    id!: number;
    name!: string;
    price!: number;
    description?: string;
    stock!: number;
    imagePath?: string;
    createdAt?: Date;
    updatedAt?: Date;
}