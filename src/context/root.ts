import { createContext } from 'react';
import { rootStore } from '../stores/root';

export const storeContext = createContext(rootStore);