import { useState } from 'react';
import { useData } from '../../context/dataContext';
import { transformDate } from '../../utils/transforms';

import styles from './FileUploader.module.css';

const ROW_SEPARATOR = '\n';
const HEADERS_COLUMN_SEPARATOR = ',';
const ROW_VALUE_SEPARATOR = ',';


const FileUploader = () => {
    const { setData, filename, setFileName } = useData();
    const [label, setLabel] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setFileName(file.name);
            const csvData = reader.result;
            processCSV(csvData);
        };

        reader.readAsText(file);
    };

    const processCSV = (csvData) => {
        const rows = csvData.split(ROW_SEPARATOR);
        const headers = rows[0].split(HEADERS_COLUMN_SEPARATOR);
        const parsedData = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            if (row.trim() === '') {
                continue;
            }

            const values = row.split(ROW_VALUE_SEPARATOR);

            const parsedDate = transformDate(headers, values);
            parsedData.push(parsedDate);
        }

        setData(parsedData);
    };

    return (
        <div className={styles.uploader} onMouseLeave={() => filename && setLabel(filename)}
            onMouseOver={() => setLabel('Upload CSV')}>
            <input type='file'
                className={styles.file_input}
                onChange={handleFileUpload} />
            <label className={styles.file_label}>{label || 'Upload CSV'}</label>
        </div>
    );
};

export default FileUploader;