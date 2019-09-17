import React, { Component } from 'react';
import GroceryList from '../../components/list';
import styles from './home.module.scss';

class App extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h1>Список продуктов</h1>
                <GroceryList />
            </div>
        )
    }
}

export default App;