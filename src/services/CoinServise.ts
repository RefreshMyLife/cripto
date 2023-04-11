import axios from 'axios';
import { coinConfig } from '../http/http';

export default class CoinsService {
    static async fetchCoins() {
        try {
            const { data } = await axios.request(coinConfig);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
    static async fetchCoinById(id: string) {
        try {
            const { data } = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
    static async fetcHistoriCoin(id: string, time: string) {
        try {
            const { data } = await axios.get(
                `https://api.coincap.io/v2/assets/${id}/history?interval=${time}`,
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
}
