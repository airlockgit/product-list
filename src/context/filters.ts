import { createContext } from 'react';
import { filtersStore } from '../stores/filters';

export const storeFiltersContext = createContext(filtersStore);