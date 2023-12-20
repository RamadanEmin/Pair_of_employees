import moment from 'moment/moment';
import { AVAILABLE_DATE_FORMATS } from './constants';

export const validateFileType = (file) => {
    if (file.type !== 'text/csv') {
        return {
            isValid: false,
            error: 'Invalid file type. Please upload a CSV file'
        };
    } else {
        return {
            isValid: true
        };
    }
};

export function checkForValidData(arr){
    let error = null;
    if (arr.length < 3 || arr.length > 4) {
        error = 'Invalid number of columns ';
    }
    else if (!arr[0] || !arr[1] || !arr[2]) {
        error = 'Missing data ';
    }
    else if (arr[3] && arr[3].trim() === 'NULL'.trim()) {
        arr[3] = 'NULL';
    }
    else if (isNaN(arr[0]) || isNaN(arr[1])) {
        error = 'Invalid type of number data ';
    }
    else if (arr[3] && arr[3] !== 'NULL'.trim()) {
        const format = AVAILABLE_DATE_FORMATS.find(f => moment(arr[3], f, true).valueOf());
        if (!format) {
            error = 'Invalid date format ';
        }
    }

    return error;
}