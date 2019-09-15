import faker from 'faker';
import { Product } from '../../types/product';
import { random } from '../../common';

export const API = {
    GET_PRODUCTS_DATA: async (number: number) => {
        let data: Array<Product> = [];
        let type: Array<string> = ['Верхняя одежда', 'Белье', 'Штаны'];
        let size: Array<string> = ['S', 'M', 'L', 'XL'];

        for (let i = 0; i <= number; i++) {
            data.push({
                id: i,
                name: faker.name.firstName(),
                type: random(type),
                color: faker.internet.color(),
                size: random(size),
                inStock: true,
                dateReceipt: faker.date.recent(),
            })
        }

        return data;
    }
};