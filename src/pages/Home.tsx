import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinItem from '../components/CoinItem/CoinItem';
import Coin from './Coin';
import CoinsService from '../services/CoinServise';

const Home = () => {
    const [coins, setCoins] = useState([]);
    let allCoins = {};
    const fetchAllCoins = async () => {
        setCoins(await CoinsService.fetchCoins());
        console.log(allCoins);
    };
    useEffect(() => {
        fetchAllCoins();
        //@ts-ignore

        console.log(coins, 'coins');
    }, []);

    console.log(coins);
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

                {
                    // @ts-ignore
                    coins?.map((coin: any) => {
                        return (
                            <Link to={`/coin/${coin.id}`} key={coin.id}>
                                <CoinItem coin={coin} />
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Home;
