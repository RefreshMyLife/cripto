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
