import './App.css';
import AppRoutes from './routes';
import { customizedThem } from "./config/theme";
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import { GlobalProvider } from 'context/GlobalContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customizedThem}>
        <AuthProvider>
          <GlobalProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </GlobalProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
