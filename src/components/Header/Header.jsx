import style from './Header.module.css';

const Header = ({ title }) => {
    return (
        <div className={style.header}>
            <h2>{title}</h2>
        </div>
    );
};

export default Header;