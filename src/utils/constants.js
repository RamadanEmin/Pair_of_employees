const ROW_SEPARATOR = '\n';
const HEADERS_COLUMN_SEPARATOR = ',';
const ROW_VALUE_SEPARATOR = ',';

const AVAILABLE_DATE_FORMATS = [
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'MM-DD-YYYY',
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'YYYY/DD/MM',
    'YYYY-DD-MM',
    'YYYYMMDD',
    'DDMMYYYY',
    'MMDDYYYY',
    'DD.MM.YYYY',
    'MM.DD.YYYY',
    'YYYY.MM.DD',
    'DD MMM YYYY',
    'DD/MMM/YYYY',
    'DD.MMM.YYYY',
    'DD-MMM-YYYY',
];

const FILTERS = [
    {
        title: 'Input',
        value: 'all'
    },
    {
        title: 'Longest working pair',
        value: 'longest'
    },
    {
        title: 'Working days',
        value: 'total'
    },
    {
        title: 'Completed Projects',
        value: 'completed'
    },
    {
        title: 'In progress',
        value: 'progress'
    }
];

const SELECT_DATA = [
    {
        title: 'Employee ID',
        value: 'EmpID'
    },
    {
        title: 'Project ID',
        value: 'ProjectID'
    },
    {
        title: 'Date From',
        value: 'DateFrom'
    },
    {
        title: 'Date To',
        value: 'DateTo'
    }
];

export {
    ROW_SEPARATOR,
    HEADERS_COLUMN_SEPARATOR,
    ROW_VALUE_SEPARATOR,
    AVAILABLE_DATE_FORMATS,
    FILTERS,
    SELECT_DATA
};