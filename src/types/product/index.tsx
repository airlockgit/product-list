export type Product = {
    id: number;
    name: string;
    type: 'Верхняя одежда' | 'Белье' | 'Штаны';
    color: string;
    size: 'S' | 'M' | 'L' | 'XL';
    inStock: boolean;
    dateReceipt: Date;
};

export interface Products { data: Array<Product>; }