import { useData } from '../../context/dataContext';
import { SELECT_DATA } from '../../utils/constants';

import styles from './Search.module.css';

const Search = () => {
    const { filter, setSearchType, searchType, search, setSearch } = useData();

    if (filter !== 'all') {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.search_box}>
                <button className={styles.btn_search}><i className='fas fa-search'></i></button>
                <input
                    className={styles.input_search}
                    type='text'
                    placeholder={'Search'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <select
                className={styles.select}
                onChange={(e) => setSearchType(e.target.value)}
                value={searchType}
            >
                {
                    SELECT_DATA.map((select) => (
                        <option key={select.value} className={styles.option} value={select.value}>{select.title}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default Search;