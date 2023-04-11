import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinItem from '../components/CoinItem/CoinItem';
import Coin from './Coin/Coin';
import CoinsService from '../services/CoinServise';
import Pagination from './../components/Paginaton/Pagination';

const Home: FC = () => {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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

    console.log(firstCoinIndex, lastCoinIndex, currentCoins);
    return (
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
                        return (
                            <Link to={`/coin/${coin.id}`} key={coin.id}>
                                <CoinItem coin={coin} />
                            </Link>
                        );
                    })}
                <Pagination
                    allPages={allPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Home;
