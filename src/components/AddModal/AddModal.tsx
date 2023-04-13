import React, { FC, useContext, useEffect, useState } from 'react';

import styles from './AddModal.module.scss';
import { ICoin } from '../../models/ICoin';
import { CoinContext } from '../../App';
const AddModal: FC<{
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    coin: ICoin;
}> = ({ active, setActive, coin }) => {
    const [inputValue, setInputValue] = useState(0);
    const { setCoinInfo } = useContext(CoinContext);

    const handleButtonClick = () => {
        if (inputValue != 0) {
            setCoinInfo({ coinsBought: inputValue / Number(coin.priceUsd), coin });
            setActive(false);
        }
    };
    return (
        <div
            className={active ? styles.active + ' ' + styles.modal : styles.modal}
            onClick={() => setActive(false)}>
            <div className={styles.modal__container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal__title}> {coin.name}</div>
                <div className={styles.modal__price}>Price {coin.priceUsd} $</div>
                <input
                    className={styles.modal__input}
                    type="number"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                />
                <label htmlFor="before">&nbsp;</label>
                $ <br />
                You buy{' '}
                <div className={styles.modal__buy}>
                    {' '}
                    {coin ? inputValue / Number(coin.priceUsd) : 0} coins
                </div>
                <button className={styles.btn} onClick={() => handleButtonClick()}>
                    Buy Coin
                </button>
            </div>
        </div>
    );
};

export default AddModal;
