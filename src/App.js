import Employee from './components/Employee/Employee';
import { DataProvider } from './context/data-context';

function App() {
    return (
        <DataProvider>
            <Employee />
        </DataProvider>
    );
}

export default App;
