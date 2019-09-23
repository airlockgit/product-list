import { createContext } from 'react';
import { productsStore } from '../stores/products';

export const storeProductsContext = createContext(productsStore);