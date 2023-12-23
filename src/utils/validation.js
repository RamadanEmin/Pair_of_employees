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

export const checkForValidHeader = (arr) => {
    let error = null;

    if (arr.length < 3) {
        error = 'Headers cannot be less than 4!';
    } else if (arr.length === 4) {
        if (arr[0].trim() !== 'EmpID' || arr[1].trim() !== 'ProjectID' || arr[2].trim() !== 'DateFrom' || arr[3].trim() !== 'DateTo') {
            error = 'Your headers is incorrect. Please put this EmpID,ProjectID,DateFrom,DateTo at very fo your CSV fail.';
        }
        else if (arr[0].trim() === '' || arr[1].trim() === '' || arr[2].trim() === '' || arr[3].trim() === '') {
            error = 'Headers cannot be less than 4!';
        }
    }

    return error;
};

export function checkForValidData(arr) {
    const givenData = moment(arr[2]);
    const year = givenData.year();

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
    else if (givenData && year && year < '1950') {
        error = 'Date From cannot be earlier than 1950 year ';
    }
    else if (moment(arr[3]).isAfter(moment())) {
        error = 'Date To cannot be a future date ';
    }
    else if (moment(arr[3]).isBefore(arr[2])) {
        error = 'Date To cannot be earlier than Date From ';
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