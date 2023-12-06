import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const getConvertedValue = (amount, fromCurrency, toCurrency) => {
        const exchangeRates = {
            UAH: { USD: 0.036, EUR: 0.030 },
            USD: { UAH: 27.78, EUR: 0.88 },
            EUR: { UAH: 33.33, USD: 1.13 },
        };

        return (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);
    };
    
    const [currency1, setCurrency1] = useState('UAH');
    const [currency2, setCurrency2] = useState('USD');
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(getConvertedValue(1, 'UAH', 'USD'));

    useEffect(() => {
        setAmount2(getConvertedValue(amount1, currency1, currency2));
    }, [currency1, currency2, amount1]);

    useEffect(() => {
        setAmount1(getConvertedValue(amount2, currency2, currency1));
    }, [currency1, currency2, amount2]);

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
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <div>
                <input type="number" value={amount2} onChange={(e) => handleAmountChange(e, 2)} />
                <select value={currency2} onChange={(e) => handleCurrencyChange(e, 2)}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    );
};

export default CurrencyConverter;
