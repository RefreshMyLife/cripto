import { Dispatch, SetStateAction } from 'react';

export interface ICoinHistory {
    date: string;
    priceUsd: string;
    time: number;
    circulatingSupply?: string;
}

export interface ICoin {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}
export type CoinInfo = {
    coin: ICoin;
    coinsBought: number;
};
export interface ICoinContextType {
    coinInfo: CoinInfo | { coin: ICoin; coinsBought: number };
    setCoinInfo: Dispatch<SetStateAction<CoinInfo>>;

    totalPriceCoins: number;
    setTotalPriceCoins: Dispatch<SetStateAction<number>>;

    currentCoinData: CoinInfo[] | [];
    setCurrentCoinData: React.Dispatch<React.SetStateAction<CoinInfo[]>>;

    coins: ICoin[] | [];
    setCoins: React.Dispatch<React.SetStateAction<[] | ICoin[]>>;

    removeCoinItem: number;
    setRemoveCoinItem: React.Dispatch<React.SetStateAction<number>>;
}
