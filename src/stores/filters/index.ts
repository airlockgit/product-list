import { types, Instance, getParent } from "mobx-state-tree";

export const Filter = types.model({
    name: types.string,
    type: types.string,
    all: types.string,
    value: types.union(types.string, types.boolean),
});

export type IFilter = Instance<typeof Filter>;

export const FiltersStore = types.model({
    filters: types.array(Filter),
})
    .views(self => ({
        get data(): Array<IFilter> {
            return self.filters.toJSON();
        },
        applyFilters(products: any) {
            let filters = this.data;

            filters.forEach((filter: any) => {
                products = products.filter((product: any) => checkConditions(product[filter.type], filter));
            });

            return products;
        },
        optionsList(type: any) {
            let root = getParent(self);
            let products = root.productsStore.products.toJSON();

            let types = products.map((item: object) => item[type])
                .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

            return types;
        }
    }))
    .actions(self => ({
        updateFilter(newFilter: IFilter) {
            let newFilters = [];

            newFilters = self.filters.filter(filter => filter.name !== newFilter.name);
            newFilters.push(newFilter);

            this.setFilters(newFilters);
        },
        setFilters(filters: any) {
            self.filters = filters;
        }
    }));

export type TFiltersStore = typeof FiltersStore.Type;

export const filtersStore = FiltersStore.create({
    filters: [],
});

const checkConditions = (value_1: any, { type, all, value, name }: { type: string, all: any, name: any, value: any }): boolean => {
    let result = false;

    switch (type) {
        case 'dateReceipt' || 'date':
            if (name === 'date_2') {
                if ((new Date(value_1) <= new Date(value)) || !value) {
                    result = true;
                }
            } else {
                if ((new Date(value_1) >= new Date(value)) || !value) {
                    result = true;
                }
            }
            break;
        default: if (value_1 === value || value === all) result = true;
    }

    return result;
}

