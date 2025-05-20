import ListPlayers  from './Components/ListPlayers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navigation/NavbarComponent'; 
import Home from './Components/Home'
import WheelFortune from './Components/WheelFortune'
function App() {
   
    return (
        <Router>
            <NavbarComponent />
            <main className="mt-0">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/listPlayers" element={<ListPlayers />} />
                    <Route path="/wheelOfFortune" element={<WheelFortune/>} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
