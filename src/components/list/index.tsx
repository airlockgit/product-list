
import React, { useState } from 'react';
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { clothingStore } from '../../stores/product-list';
import { Select, Checkbox, DatePicker } from 'antd';
import { Column, Table } from 'react-virtualized';
import styles from './list.module.scss';
import 'react-virtualized/styles.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const useProducts = () => {
    const [state] = useState(() => observable(clothingStore))

    return {
        products: state.productsData,
        sortedProducts: state.sortedProducts,
        updateSort: state.updateSort,
        all: state.all,
    }
};

interface Props {
    store?: any;
}

const GroceryList = (props: Props) => {
    const { sortedProducts, products, updateSort, all: option_all } = useProducts();

    const _handleSelectDate = (date: any, dateString: any) => {
        updateSort({
            date: dateString[0],
            dateTo: dateString[1],
        });
    }

    const _handleSelectType = (type: number | string) => {
        updateSort({
            type: type === option_all ? false : type,
        });
    }

    const _handleSelectColor = (type: number | string) => {
        updateSort({
            color: type === option_all ? false : type,
        });
    }

    const _handleSelectSize = (size: number | string) => {
        updateSort({
            size: size === option_all ? false : size,
        });
    }

    const _handleCheckboxInStoke = (e: any) => {
        let checked: boolean = e.target.checked;

        updateSort({
            inStock: checked,
        });
    }

    const selectValueOptions = (option: any) => {
        let types = products.map(item => item[option])
            .filter((value, index, self) => self.indexOf(value) === index);

        return types.map((type, i) => (
            <Option value={type} key={i}>{type}</Option>
        ))
    };

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
                <div className={styles.section__options}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <span className={styles.tableCellTitle}>Тип</span>
                                </td>
                                <td className={styles.tableCellForSwitch}>
                                    <Select
                                        className={styles.table__select}
                                        defaultValue={option_all}
                                        onChange={_handleSelectType}
                                    >
                                        <Option value={option_all}>Все</Option>
                                        {selectValueOptions('type')}
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={styles.tableCellTitle}>Цвет</span>
                                </td>
                                <td className={styles.tableCellForSwitch}>
                                    <Select
                                        className={styles.table__select}
                                        defaultValue={option_all}
                                        onChange={_handleSelectColor}
                                    >
                                        <Option value={option_all}>Все</Option>
                                        {selectValueOptions('color')}
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={styles.tableCellTitle}>Размер</span>
                                </td>
                                <td className={styles.tableCellForSwitch}>
                                    <Select
                                        className={styles.table__select}
                                        defaultValue={option_all}
                                        onChange={_handleSelectSize}
                                    >
                                        <Option value={option_all}>Все</Option>
                                        {selectValueOptions('size')}
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={styles.tableCellTitle}>В наличие</span>
                                </td>
                                <td className={styles.tableCellForSwitch}>
                                    <Checkbox
                                        onChange={_handleCheckboxInStoke}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.tableCellForDate} colSpan={2}>
                                    <RangePicker onChange={_handleSelectDate} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default observer(GroceryList);