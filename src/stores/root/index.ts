import { types } from "mobx-state-tree";
import { FiltersStore, filtersStore } from "../filters";
import { ProductsStore, productsStore } from "../products";

export const RootStore = types
    .model({
        productsStore: ProductsStore,
        filtersStore: types.optional(FiltersStore, {}),
    })

export const rootStore = RootStore.create({
    productsStore: productsStore,
    filtersStore: filtersStore,
});

export type TRootStore = typeof RootStore.Type;