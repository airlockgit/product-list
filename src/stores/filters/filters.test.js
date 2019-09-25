import { FiltersStore, filtersStore } from './index';
import { rootStore } from '../root';

const newFilter = {
    name: 'type',
    type: 'type',
    value: 'all',
    all: 'all',
};

const ProductsList = [{
    type: 'type'
}];

it('Filters store is not created', () => {
    const initialState = {
        filters: [newFilter],
    };
    const filtersStore = FiltersStore.create(initialState);

    expect(filtersStore.filters.length).toBe(1);
});

it('Update filters in Filters store', () => {
    filtersStore.updateFilter(newFilter);

    expect(filtersStore.filters.length).toBe(1);
    expect(filtersStore.filters).toEqual([newFilter]);
});

it('Get options list in Filters store', () => {
    let options = filtersStore.optionsList(newFilter.type);

    expect(Array.isArray(options)).toBe(true);
});

it('Get list with filters applied in Filters store', () => {
    filtersStore.updateFilter(newFilter);
    let list = filtersStore.applyFilters(ProductsList);

    expect(list.length).toBe(1);
});