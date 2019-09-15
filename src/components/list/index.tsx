
import React, { Component } from 'react';
import { Products } from '../../types/product';
import styled from './list.module.scss';

class List extends Component<Products, {}> {
    render() {
        return (
            <div className={styled.container}>
                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Цвет</th>
                            <th>Размер</th>
                            <th>В наличие</th>
                            <th>Дата поступления</th>
                        </tr>
                        {
                            this.props.data.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.type}</td>
                                    <td>{product.color}</td>
                                    <td>{product.size}</td>
                                    <td>{product.inStock ? 'Да' : 'Нет'}</td>

                                </tr>
                            ))
                        }
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;