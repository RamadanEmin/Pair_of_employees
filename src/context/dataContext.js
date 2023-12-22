import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [filename, setFileName] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchType, setSearchType] = useState('ProjectID');
    const value = {
        data,
        setData,
        filename,
        setFileName,
        search,
        setSearch,
        filter,
        setFilter,
        searchType,
        setSearchType
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useData };