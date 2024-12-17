import './App.css'
import { NavBar } from './components/NavBar';
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
 
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
