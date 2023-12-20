import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const value = { data, setData };

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