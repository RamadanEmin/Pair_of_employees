import Header from '../Header/Header';
import style from './Employee.module.css';
import FileUploader from '../FileUploader/FileUploader';

const Employee = () => {
    return (
        <div className={style.container}>
            <Header title={'Employee App'} />
            <FileUploader />
        </div>);
};

export default Employee;