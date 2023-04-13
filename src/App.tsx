import { FC, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Coin from './pages/Coin/Coin';
import React from 'react';
import { CoinInfo, ICoin, ICoinContextType } from './models/ICoin';

export const CoinContext = React.createContext<ICoinContextType>({
    coinInfo: {
        coin: {
            id: '',
            rank: '',
            symbol: '',
            name: '',
            supply: '',
            maxSupply: '',
            marketCapUsd: '',
            volumeUsd24Hr: '',
            priceUsd: '',
            changePercent24Hr: '',
            vwap24Hr: '',
        },
        coinsBought: 0,
    },

    setTotalPriceCoins: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    totalPriceCoins: 0,

    coins: [],
    setCoins: function (value: React.SetStateAction<[] | ICoin[]>): void {
        throw new Error('Function not implemented.');
    },
    setCoinInfo: function (value: React.SetStateAction<CoinInfo>): void {
        throw new Error('Function not implemented.');
    },
    setCurrentCoinData: function (value: React.SetStateAction<CoinInfo[]>): void {
        throw new Error('Function not implemented.');
    },
    currentCoinData: [],
    removeCoinItem: 0,
    setRemoveCoinItem: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
});
const App: FC = () => {
    const [coinInfo, setCoinInfo] = useState<CoinInfo>({} as CoinInfo);
    const [coins, setCoins] = useState<ICoin[] | []>([]);
    const [totalPriceCoins, setTotalPriceCoins] = useState(0);
    const [currentCoinData, setCurrentCoinData] = useState<CoinInfo[]>([]);
    const [removeCoinItem, setRemoveCoinItem] = useState<number>(0);

    return (
        <>
            {' '}
            <CoinContext.Provider
                value={{
                    coinInfo,
                    setCoinInfo,
                    coins,
                    setCoins,
                    totalPriceCoins,
                    setTotalPriceCoins,
                    currentCoinData,
                    setCurrentCoinData,
                    removeCoinItem,
                    setRemoveCoinItem,
                }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin" element={<Coin />}>
                        <Route path=":coinId" element={<Coin />} />
                    </Route>
                </Routes>
            </CoinContext.Provider>
        </>
    );
};

export default App;
