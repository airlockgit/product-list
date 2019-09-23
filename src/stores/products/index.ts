import { types, getParent } from "mobx-state-tree";
import { API } from '../../api/list';

export const ProductType = types.model({
    id: types.number,
    name: types.string,
    type: types.union(types.literal('Верхняя одежда'), types.literal('Белье'), types.literal('Штаны')),
    color: types.string,
    size: types.union(types.literal('S'), types.literal('M'), types.literal('L'), types.literal('XL')),
    inStock: types.boolean,
    dateReceipt: types.string,
});

export type Product = typeof ProductType.Type;

export const ProductsStore = types
    .model("ProductsStore", {
        products: types.array(ProductType),
        count: types.number,
    })
    .views(self => ({
        get root() {
            return getParent(self);
        },
        get productsData(): Array<Product> { return self.products.toJSON() },
        get sortedProducts(): Array<Product> {
            return this.root.filtersStore.applyFilters(this.productsData);
        },
    }))
    .actions(self => ({
        updateClothing(products: any) {
            self.products = products;
        },
        loadingClothing() {
            const { updateClothing } = this;

            API.GET_PRODUCTS_DATA(self.count).
                then(data => {
                    updateClothing(data);
                });
        },
        afterCreate() {
            this.loadingClothing();
        }
    }));

export type TProductsStore = typeof ProductsStore.Type;

export const productsStore = ProductsStore.create({
    products: [],
    count: 1000,
});