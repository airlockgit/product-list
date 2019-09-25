import { ProductsStore } from ".";
import { rootStore } from '../root';

const initialState = {
    products: [],
    count: 1000,
};

it('Products store is not created', () => {
    const productsStore = ProductsStore.create(initialState);

    expect(productsStore.count).toBe(1000);
});

it('Get sortedProducts() is fails', () => {
    const productsStore = rootStore.productsStore;

    expect(Array.isArray(productsStore.sortedProducts)).toBe(true);
});