import { types, Instance } from 'mobx-state-tree';

export const ProductType = types.model({
    id: types.number,
    name: types.string,
    type: types.union(types.literal('Верхняя одежда'), types.literal('Белье'), types.literal('Штаны')),
    color: types.string,
    size: types.union(types.literal('S'), types.literal('M'), types.literal('L'), types.literal('XL')),
    inStock: types.boolean,
    dateReceipt: types.string,
});

export const SortType = types.model({
    type: types.maybe(types.union(types.string, types.boolean)),
    color: types.maybe(types.union(types.string, types.boolean)),
    size: types.maybe(types.union(types.string, types.boolean)),
    inStock: types.maybe(types.boolean),
    date: types.maybe(types.string),
    dateTo: types.maybe(types.string),
});

export type Product = Instance<typeof ProductType>;
export type TSort = Instance<typeof SortType>;