import { useCallback } from 'react';
import { useData } from '../../context/dataContext';
import Table from '../Table/Table';

const TableRenderer = () => {
    const { filter, data } = useData();

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
                    header: ['Employee ID #1', 'Employee ID #2', 'Project ID', 'Days worked'],
                    body: data
                };
            case 'total':
                return {
                    title: 'Total working days per project',
                    header: ['Project ID', 'Days worked'],
                    body: data
                };
            case 'progress':
                return {
                    title: 'Projects under development',
                    header: ['Project ID'],
                    body: data
                };
            case 'completed':
                return {
                    title: 'Completed projects',
                    header: ['Project ID', 'Completed Date'],
                    body: data
                };

            default:
                return null;
        }
    };

    const selectedTable = useCallback(renderer(filter, data), [filter, data]);

    return (
        <div>
            <Table data={selectedTable} />
        </div>
    );
};

export default TableRenderer;