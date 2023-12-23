import { useEffect, useState } from 'react';
import { useData } from '../../context/dataContext';
import { useError } from '../../context/errorContext';
import { checkForValidData, checkForValidHeader, validateFileType } from '../../utils/validation';
import { transformDate } from '../../utils/transforms';
import { HEADERS_COLUMN_SEPARATOR, ROW_SEPARATOR, ROW_VALUE_SEPARATOR } from '../../utils/constants';

import styles from './FileUploader.module.css';

const reader = new FileReader();
const FileUploader = () => {
    const { error, setError } = useError();
    const { setData, filename, setFileName } = useData();
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (file) {
            processCSV(file);
        }
    }, [file]);
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        
        
        if (!file) {
            setError('Please upload a CSV file');
            return false;
        }
        
        reader.onload = () => {
            const validation = validateFileType(file);
            
            if (!validation.isValid) {
                setError(validation.error);
                return;
            }
            
            if (error) {
                setError(null);
            }
            setFileName(file.name);
            setFile(reader.result);
        };

        reader.onerror = () => {
            setError('Unable to read file');
            return false;
        };

        reader.readAsText(file);

        event.target.value = null;
    };

    const processCSV = (csvData) => {

        let validation;

        const rows = csvData.split(ROW_SEPARATOR);
        const headers = rows[0].split(HEADERS_COLUMN_SEPARATOR);

        validation = checkForValidHeader(headers);
        if (validation) {
            setError(validation);
            return;
        }

        const parsedData = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            if (row.trim() === '') {
                continue;
            }

            const values = row.split(ROW_VALUE_SEPARATOR).map(v => v.trim());
            validation = checkForValidData(values);

            if (validation) {
                setError(`${validation} in row ${i}. Please check your file.`);
                return;
            }

            const parsedDate = transformDate(headers, values);
            parsedData.push(parsedDate);
        }

        if (parsedData.length === 0) {
            setError('No data found in CSV');
        }

        setData(parsedData);
    };

    return (
        <div className={styles.uploader} >
            <input type='file'
                className={styles.file_input}
                onChange={handleFileUpload} />
            <label className={styles.file_label}>{filename || 'Upload file'}</label>
        </div>
    );
};

export default FileUploader;