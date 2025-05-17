import ListPlayers  from './Components/ListPlayers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navigation/NavbarComponent'; 
import Home from './Components/Home'
function App() {
   
    return (
        <Router>
            <NavbarComponent />
            <main className="mt-0">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/listPlayers" element={<ListPlayers />} />
                    
                </Routes>
            </main>
        </Router>
    );
}

export default App;
