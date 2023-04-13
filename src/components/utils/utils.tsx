import { CoinInfo } from '../../models/ICoin';

export const getTotalPriceCoins = (coins: CoinInfo[]) => {
    const totalSum = coins.reduce((totalSum, item: CoinInfo) => {
        return totalSum + Number(item?.coin?.priceUsd) * Number(item?.coinsBought);
    }, 0);

    return totalSum;
};
