import './App.css';
import './css/global.css'
import './css/productAndCards.css'
import './css/register.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register';

const App = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/register' element={ <Register /> } />
        </Routes>
    </BrowserRouter>
    )
}

export default App;
