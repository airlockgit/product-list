import React, { useContext} from 'react';
import { storeContext } from '../context/root';
import { storeFiltersContext } from '../context/filters';
import { storeProductsContext } from '../context/products';
import { TRootStore } from '../stores/root';
import { useObserver } from "mobx-react-lite";
import { TProductsStore } from '../stores/products';
import { TFiltersStore } from '../stores/filters';

export const useStoreData = <Selection, ContextData, Store>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelector: (store: Store) => Selection
) => {
    const value = useContext(context);
    if (!value) {
        console.error('error hook', value);
    }
    const store = storeSelector(value);
    return useObserver(() => {
        return dataSelector(store);
    });
};

export const useRootData = <Selection>(
    dataSelector: (store: TRootStore) => Selection
) => useStoreData(storeContext, contextData => contextData!, dataSelector);

export const useProductsData = <Selection>(dataSelector: (store: TProductsStore) => Selection) =>
    useStoreData(storeProductsContext, contextData => contextData!, dataSelector);

export const useFiltersData = <Selection>(
    dataSelector: (store: TFiltersStore) => Selection
) => useStoreData(storeFiltersContext, contextData => contextData!, dataSelector);