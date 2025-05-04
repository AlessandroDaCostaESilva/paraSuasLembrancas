import './App.css';
import './css/global.css';
import './css/productAndCards.css';
import './css/register.css';
import './css/cart.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UserCartPage from './pages/UserCartPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/protected'
                    element={
                        <ProtectedRoute>
                            <div>Página Protegida</div>
                        </ProtectedRoute>
                    }
                />
                <Route path='/carrinho/:id' element={<UserCartPage usuarioId={2} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
