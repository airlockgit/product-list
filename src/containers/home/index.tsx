import React, { Component } from 'react';
import { API } from '../../api/list';
import List from '../../components/list';

class App extends Component {

    state = {
        products: [],
    }

    componentDidMount = () => {
        API.GET_PRODUCTS_DATA(1000).
            then(data => this.setState({ products: data }));
    }

    render() {

        return (
            <div>
                <List data={this.state.products} />
            </div>
        )
    }
}

export default App;