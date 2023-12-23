import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

const useError = () => {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error('useError must be used within a ErrorProvider');
    }
    return context;
};

export { ErrorProvider, useError };