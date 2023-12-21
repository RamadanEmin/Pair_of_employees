import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Header from '../Header/Header';
import FilterTables from '../FilterTables/FilterTables';
import FileUploader from '../FileUploader/FileUploader';
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
                </div>
            )}
        </div>);
};

export default Employee;