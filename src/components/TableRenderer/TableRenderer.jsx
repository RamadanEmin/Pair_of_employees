import _ from 'lodash';
import { useCallback } from 'react';
import { useData } from '../../context/dataContext';
import { findLongestWorkedPair, groupWorkedDaysByProject, completedProjects, groupIncompleteProjects } from '../../utils/helpers';
import Table from '../Table/Table';

import styles from './TableRenderer.module.css';

const TableRenderer = () => {
    const { filter, data, search, searchType } = useData();

    const filteredData = data.filter(d => {
        if (search ) {
            return d[searchType].toString().includes(search);
        }

        return true;
    });

    const renderer = (filter, data) => {
        switch (filter) {
            case 'all':
                return {
                    title: 'Input data',
                    header: ['Employee ID', 'Project ID', 'Date From', 'Date To'],
                    body: data,

                };
            case 'longest':
                return {
                    title: 'The longest working couple on a project',
                    header: ['EmpID #1', 'EmpID #2', 'Project ID', 'Days worked'],
                    body: findLongestWorkedPair(data),
                };
            case 'total':
                return {
                    title: 'Total working days per project',
                    header: ['Project ID', 'Days worked'],
                    body: groupWorkedDaysByProject(data),
                };
            case 'progress':
                return {
                    title: 'Projects under development',
                    header: ['Project ID'],
                    body: groupIncompleteProjects(data),
                };
            case 'completed':
                return {
                    title: 'Completed projects',
                    header: ['Project ID', 'Completed Date'],
                    body: _.flatten(completedProjects(data)),
                };

            default:
                return null;
        }
    };

    const selectedTable = useCallback(renderer(filter, filteredData), [filter, filteredData]);

    return (
        <div className={styles.container}>
            {filteredData.length > 0
                ? <Table data={selectedTable} />
                : (<div><h2 className={styles.not_found}>No result found</h2></div>)
            }
        </div>
    );
};

export default TableRenderer;
