import { types } from "mobx-state-tree";
import { values } from "mobx";
import { ProductType, SortType, TSort, Product } from '../../types/product';
import { API } from '../../api/list';

const store = types.model("ClothingStore", {
    products: types.array(ProductType),
    count: types.number,
    sort: SortType,
    all: types.string,
})
    .views(self => ({
        get productsData(): Array<Product> { return self.products.toJSON() },
        get sortedProducts(): Array<Product> {
            const { type, color, size, inStock, date, dateTo } = self.sort;
            let { products } = self;
            let result = products.toJSON();

            result = products.filter(product => {
                if (product.inStock === inStock &&
                    (product.type === type || !type) &&
                    (product.color === color || !color) &&
                    (product.size === size || !size)
                ) {
                    if ((date && date !== '') && dateTo && dateTo !== '') {
                        if (new Date(product.dateReceipt) >= new Date(date) && new Date(product.dateReceipt) <= new Date(dateTo)) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            });

            return result;
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
        updateSort(newSort: any) {
            let { sort } = self;

            self.sort = { ...sort, ...newSort };
        },
        afterCreate() {
            this.loadingClothing();
        }
    }));

export const clothingStore = store.create({
    products: [],
    count: 1000,
    sort: {
        type: false,
        size: false,
        color: false,
        inStock: false,
        date: '',
        dateTo: '',
    },
    all: 'all',
});