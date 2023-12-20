import moment from 'moment/moment';
import { AVAILABLE_DATE_FORMATS } from './constants';

function transformDate(headers,values) {
    const parsedRow = {};

    for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const value = values[j];

        if (header === 'DateFrom' || header === 'DateTo') {
            if (value && value !== 'NULL'.trim()) {
                const format = AVAILABLE_DATE_FORMATS.find(f => moment(value, f, true).valueOf());
                parsedRow[header] = moment(value, format).format('YYYY/MM/DD');
            } else if (header === 'DateTo') {
                parsedRow[header] = moment().format('YYYY/MM/DD');
            }
        } else {
            parsedRow[header] = value;
        }
    }

    return parsedRow;
}

export { transformDate };