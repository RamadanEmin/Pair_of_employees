import Header from '../Header/Header';
import FileUploader from '../FileUploader/FileUploader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import FilterTables from '../FilterTables/FilterTables';
import TableRenderer from '../TableRenderer/TableRenderer';
import Search from '../Search/Search';
import { useData } from '../../context/dataContext';

import style from './Employee.module.css';

const Employee = () => {
    const { data } = useData();
    return (
        <div className={style.container}>
            <Header title={'Employee App'} />
            <FileUploader />
            <ErrorHandler />
            {data.length > 0 && (
                <div className={style.content_wrapper}>
                    <FilterTables />
                    <Search />
                    <TableRenderer />
                </div>
            )}
        </div>);
};

export default Employee;