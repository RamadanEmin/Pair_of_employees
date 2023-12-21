import { useData } from '../../context/dataContext';
import { FILTERS } from '../../utils/constants';

import styles from './FilterTables.module.css';

const FilterTables = () => {
    const { filter: activeFilter, setFilter } = useData();

    return (
        <div className={styles.container}>
            {
                FILTERS.map((filter, filterIndex) => (
                    <button style={{ color: activeFilter === filter.value ? '#fff' : filterIndex === 0 ? '#fcb321' : '#666' }} key={filter.value}
                        className={styles.filter}
                        onClick={() => setFilter(filter.value)}>{filter.title}
                    </button>
                ))
            }
        </div>
    );
};

export default FilterTables;