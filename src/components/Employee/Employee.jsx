import Header from '../Header/Header';

import style from './Employee.module.css';

const Employee = () => {
    return (
        <div className={style.container}>
            <Header title={'Employee App'} />
        </div>);
};

export default Employee;