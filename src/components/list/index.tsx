import React from 'react';
import { useProductsData, useFiltersData } from '../../hooks';
import { Column, Table } from 'react-virtualized';
import styles from './list.module.scss';
import 'react-virtualized/styles.css';
import { Filters, Select, Checkbox, Date } from '../filters';

const GroceryList = () => {
    const { sortedProducts } = useProductsData(store => ({
        sortedProducts: store.sortedProducts,
        products: store.products,
    }));

    const { optionsList, updateFilter } = useFiltersData(store => ({
        optionsList: store.optionsList,
        updateFilter: store.updateFilter,
    }));

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.section__table}>
                    <Table
                        headerHeight={30}
                        height={300}
                        rowHeight={20}
                        rowCount={sortedProducts.length}
                        rowGetter={({ index }) => sortedProducts[index]}
                        width={900}>
                        <Column
                            dataKey="id"
                            width={70}
                            label="id"
                        />
                        <Column
                            dataKey="name"
                            width={120}
                            disableSort
                            label="Название"
                        />
                        <Column
                            dataKey="type"
                            width={160}
                            disableSort
                            label="тип"
                        />
                        <Column
                            dataKey="color"
                            width={90}
                            disableSort
                            label="Цвет"
                        />
                        <Column
                            dataKey="size"
                            width={100}
                            disableSort
                            label="Размер"
                        />
                        <Column
                            dataKey="inStock"
                            width={130}
                            disableSort
                            label="В наличии"
                        />
                        <Column
                            dataKey="dateReceipt"
                            width={190}
                            disableSort
                            label="Дата поступления"
                        />
                    </Table>
                </div>
                <Filters>
                    <Select
                        title='Тип'
                        options={optionsList('type')}
                        defaultValue='all'
                        defaultTitle='Все'
                        change={(value: any) => updateFilter({ value, name: 'type', type: 'type', all: 'all' })}
                    />
                    <Select
                        title='Цвет'
                        options={optionsList('color')}
                        defaultValue='all'
                        defaultTitle='Все'
                        change={(value: any) => updateFilter({ value, name: 'color', type: 'color', all: 'all' })}
                    />
                    <Select
                        title='Размер'
                        options={optionsList('size')}
                        defaultValue='all'
                        defaultTitle='Все'
                        change={(value: any) => updateFilter({ value, name: 'size', type: 'size', all: 'all' })}
                    />
                    <Checkbox
                        title='В наличие'
                        change={(value: boolean) => updateFilter({ value, name: 'inStock', type: 'inStock', all: 'all' })}
                    />
                    <Date
                        change={(value: any, name: string) => updateFilter({ value, name, type: 'dateReceipt', all: 'all' })}
                    />
                </Filters>
            </div>
        </div>
    )
}

export default GroceryList;