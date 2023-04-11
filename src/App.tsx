import { FC, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Coin from './pages/Coin/Coin';
import Home from './pages/Home';

const App: FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coin" element={<Coin />}>
                    <Route path=":coinId" element={<Coin />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
