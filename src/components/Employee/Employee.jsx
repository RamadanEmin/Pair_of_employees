import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Header from '../Header/Header';
import FileUploader from '../FileUploader/FileUploader';

import style from './Employee.module.css';

const Employee = () => {
    return (
        <div className={style.container}>
            <Header title={'Employee App'} />
            <FileUploader />
            <ErrorHandler />
        </div>);
};

export default Employee;