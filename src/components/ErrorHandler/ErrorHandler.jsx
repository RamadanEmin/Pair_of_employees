import { useError } from '../../context/errorContext';
import styles from './ErrorHandler.module.css';

const ErrorHandler = () => {
    const { error, setError } = useError();
    if (!error) {
        return null;
    }

    return (
        <div className={styles.alert}>
            <span className={styles.closebtn} onClick={() => setError(null)}>&times;</span>
            {error}
        </div>
    );
};

export default ErrorHandler;