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
}
