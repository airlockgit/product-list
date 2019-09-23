import React, { FunctionComponent } from 'react';
import { Select as SelectAntd, Checkbox as CheckboxAnt, DatePicker } from 'antd';
import classNames from 'classnames';
import styles from './filters.module.scss';
import 'react-virtualized/styles.css';
const { Option } = SelectAntd;
const { RangePicker } = DatePicker;

type FiltersProps = { classes?: FiltersClasses; };
type FiltersClasses = { container?: string; table?: string };

export const Filters: FunctionComponent<FiltersProps> = ({ children, classes = {} }) => {
    return (
        <div className={classNames(styles.section__options, classes.container)}>
            <table className={classNames(styles.table, classes.table)}>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

type SelectProps = {
    classes?: SelectClasses;
    options?: Array<any>;
    defaultValue?: string;
    defaultTitle?: string;
    title?: string;
    change?: any;
};

type SelectClasses = { row?: string, clRight?: string; clLeft?: string; select?: string; option?: string; };

export const Select: FunctionComponent<SelectProps> = ({
    classes = {}, options = [], title, defaultValue, defaultTitle, change
}) => {

    const selectValueOptions = () => options.map((type: any, i: number) => (
        <Option className={classes.option} value={type} key={i} > {type} </Option>
    ));

    return (
        <tr>
            <td className={classNames(classes.clRight)}>
                <span className={styles.tableCellTitle}>{title}</span>
            </td>
            <td className={classNames(styles.tableCellForSwitch, classes.clRight)}>
                <SelectAntd
                    className={classNames(styles.table__select, classes.select)}
                    defaultValue={defaultValue}
                    onChange={change}
                >
                    {
                        <Option value={defaultValue}>{defaultTitle}</Option>
                    }
                    {selectValueOptions()}
                </SelectAntd>
            </td>
        </tr>
    )
}

type CheckboxClasses = { row?: string, clRight?: string; clLeft?: string; checkbox?: string }

type CheckboxProps = {
    classes?: CheckboxClasses;
    title?: string;
    change?: any;
};

export const Checkbox: FunctionComponent<CheckboxProps> = ({
    classes = {}, title, change
}) => {

    const _handleChange = (e: any) => {
        let checked: boolean = e.target.checked;

        change(checked);
    }

    return (
        <tr className={classes.row}>
            <td className={classes.clLeft}>
                <span className={styles.tableCellTitle}>{title}</span>
            </td>
            <td className={classNames(styles.tableCellForSwitch, classes.clRight)}>
                <CheckboxAnt
                    className={classes.checkbox}
                    onChange={_handleChange}
                />
            </td>
        </tr>
    );
}

type DateClasses = { row?: string, clRight?: string; date?: string }

type DateProps = {
    classes?: DateClasses;
    title?: string;
    change?: any;
};

export const Date: FunctionComponent<DateProps> = ({
    classes = {}, change
}) => {

    const _handleChange = (date: any, dateString: Array<string>) => {
        dateString.map((date, i) => change(date, `date_${i + 1}`));
    }

    return (
        <tr className={classes.row}>
            <td className={classNames(styles.tableCellForDate, classes.clRight)} colSpan={2}>
                <RangePicker
                    className={classes.date}
                    onChange={_handleChange}
                />
            </td>
        </tr>
    );
}
