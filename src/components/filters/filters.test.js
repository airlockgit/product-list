import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Filters, Select, Checkbox, Date } from './index';

test('Filters renderer', () => {
    const filters = renderer
        .create(<Filters classes={{ container: 'container', table: 'className' }} />)
        .toJSON();

    expect(filters).toMatchSnapshot();
});

test('Filters check classes', () => {
    const filters = shallow(<Filters classes={{ container: 'container', table: 'className' }} />);

    expect(filters.hasClass('container')).toBe(true);
});

test('Select render correctly', () => {
    const select = renderer
        .create(<Select />)
        .toJSON();

    expect(select).toMatchSnapshot();
});

test('Select without props', () => {
    const select = shallow(<Select />);

    expect(select.find('tr').length).toBe(1);
});

test('Checkbox render correctly', () => {
    const checkbox = renderer
        .create(<Checkbox />)
        .toJSON();

    expect(checkbox).toMatchSnapshot();
});

test('Checkbox without props', () => {
    const checkbox = shallow(<Checkbox />);

    expect(checkbox.find('tr').length).toBe(1);
});

it("Checkbox check prop title", () => {
    const checkbox = shallow(<Checkbox title='In stock'/>);

    expect(checkbox.find('span').text()).toEqual("In stock");
});