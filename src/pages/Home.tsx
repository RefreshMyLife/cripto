import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinItem from '../components/CoinItem/CoinItem';
import Coin from './Coin/Coin';
import CoinsService from '../services/CoinServise';
import Pagination from './../components/Paginaton/Pagination';
import { CoinContext } from '../App';

const Home: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { coins, setCoins } = useContext(CoinContext);
    const fetchAllCoins = async () => {
        setCoins(await CoinsService.fetchCoins());
    };

    useEffect(() => {
        fetchAllCoins();
    }, []);

    const allPage = Math.ceil(coins.length / 10);
    const lastCoinIndex = currentPage * 10;
    const firstCoinIndex = lastCoinIndex - 10;
    const currentCoins = coins.slice(firstCoinIndex, lastCoinIndex);

    return (
        <>
            <div className="container">
                <div>
                    <div className="heading">
                        <p>#</p>
                        <p className="coin-name">Coin</p>
                        <p>Price</p>
                        <p className="hide-mobile">24h</p>
                        <p className="hide-table">Volume</p>
                        <p className="hide-laptop">Mkt Cap</p>
                    </div>

                    {coins &&
                        currentCoins?.map((coin: any) => {
                            return <CoinItem coin={coin} key={coin.id} />;
                        })}

                    <Pagination
                        allPages={allPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
