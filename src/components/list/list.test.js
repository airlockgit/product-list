import React from 'react';
import ReactDOM from 'react-dom';
import GroceryList from './index';

it('GroceryList renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GroceryList />, div);
    ReactDOM.unmountComponentAtNode(div);
});