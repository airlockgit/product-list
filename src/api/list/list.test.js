import { API } from './index';

it('Get PRODUCTS API.API.GET_PRODUCTS_DATA()', async () => {
    let count = 10;
    let data = await API.GET_PRODUCTS_DATA(count);

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(count);
});