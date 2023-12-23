import TableTitle from './TableTitle';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import styles from './Table.module.css';

const Table = ({ data }) => {
    if (!data || !data.body) {
        return null;
    }

    return (
        <div className={styles.container}>
            <TableTitle title={data.title} />
            <table className={styles.table}>
                <thead>
                    <tr>
                        {data.header.map((header, headerIndex) => {
                            return <TableHeader key={headerIndex} header={header} />;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.body.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                <TableRow row={row} />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {data.total && <p className={styles.total}>Total <span>{data.total}</span> days worked</p>}
        </div>
    );
};

export default Table;