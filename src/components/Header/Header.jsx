import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = (props) => {
    const [currencies, setCurrencies] = useState([]);
    const [currency1, setCurrency1] = useState('');
    const [currency2, setCurrency2] = useState('');
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(0);

    useEffect(() => {
        axios.get('https://v6.exchangerate-api.com/v6/82db9e58c39362997f06857d/latest/USD')
            .then(response => {
                const currencyList = Object.keys(response.data.rates);
                console.log(response.data)
                setCurrencies(currencyList);
                setCurrency1(currencyList[0]);
                setCurrency2(currencyList[1]);
            })
            .catch(error => {
                console.error('Error fetching currency list:', error);
            });
    }, []);

    useEffect(() => {
        if (currency1 && currency2) {
            axios.get(`https://open.er-api.com/v6/latest/${currency1}`)
                .then(response => {
                    const exchangeRate = response.data.rates[currency2];
                    setAmount2((amount1 * exchangeRate).toFixed(2));
                })
                .catch(error => {
                    console.error('Error fetching exchange rate:', error);
                });
        }
    }, [currency1, currency2, amount1]);

    const handleCurrencyChange = (event, currencyNum) => {
        const selectedCurrency = event.target.value;
        if (currencyNum === 1) {
            setCurrency1(selectedCurrency);
        } else {
            setCurrency2(selectedCurrency);
        }
    };

    const handleAmountChange = (event, inputNum) => {
        const inputValue = event.target.value;
        const parsedValue = parseFloat(inputValue);

        if (!isNaN(parsedValue) || inputValue === '') {
            if (inputNum === 1) {
                setAmount1(parsedValue);
            } else {
                setAmount2(parsedValue);
            }
        }
    };

    return (
        <div>
            <div>
                <input type="number" value={amount1} onChange={(e) => handleAmountChange(e, 1)} />
                <select value={currency1} onChange={(e) => handleCurrencyChange(e, 1)}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type="number" value={amount2} onChange={(e) => handleAmountChange(e, 2)} readOnly />
                <select value={currency2} onChange={(e) => handleCurrencyChange(e, 2)}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Header;