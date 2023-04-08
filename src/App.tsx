import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Coin from './pages/Coin';
import Home from './pages/Home';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coin" element={<Coin />}>
                    <Route index element={<Coin />} />
                    <Route path=":coinId" element={<Coin />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
