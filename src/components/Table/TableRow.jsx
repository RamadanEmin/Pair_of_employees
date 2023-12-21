import TableCell from './TableCell';

const TableRow = ({ row }) => {
    return (
        <>
            {Object.values(row).map((cell, cellIndex) => {
                if (typeof cell === 'object') {
                    return null;
                }

                return <TableCell key={cellIndex} cell={cell} />;
            })}
        </>
    );
};

export default TableRow;