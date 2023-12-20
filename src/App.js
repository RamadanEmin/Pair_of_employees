import Employee from './components/Employee/Employee';
import { DataProvider } from './context/dataContext';
import { ErrorProvider } from './context/errorContext';

function App() {
    return (
        <ErrorProvider>
            <DataProvider>
                <Employee />
            </DataProvider>
        </ErrorProvider>
    );
}

export default App;
