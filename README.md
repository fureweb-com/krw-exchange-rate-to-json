# KRW Exchange rate to JSON

The easiest way to get the won exchange rate with JSON

## Installation
```
npm install --save krw-exchange-rate-to-json
```

## How to use
```js
const getExchangeRateDataFromWebPage = require('krw-exchange-rate-to-json');

getExchangeRateDataFromWebPage().then(
    r => console.log(r),
    err => console.error(err)
);
```

## WEB API

### Description
You can get JSON data (without any restriction) by sending an http request with the following path: 

http://api.fureweb.com/exchangeRate/

### Data Format

```javascript
{
    requestDate: "Number", // Time of request
    date: "Number", // Time of bank notice
    times: "Number", // Number of bank notifications on the day
    data: [
        {
            countryName: "String", // literally. The rest is omitted
            currencyCode: "String", // ISO Code
            cash: {
                buy: {
                    exchangeRate: "Number",
                    spread: "Number" 
                },
                sell: {
                    exchangeRate: "Number",
                    spread: "Number" 
                }
            },
            remittance: {
                send: "Number",
                receive: "Number"
            },
            travelersCheck: {
                buy: "Number"
            },
            foreignCurrencyCheck: {
                sell: "Number"
            },
            tradingStandardRate: "Number", 
            exchangeFee: "Number",
            USDConversionRate: "Number" // Percentage of the exchange rate of each country relative to the US dollar
        }
    ]
};
```
## License
MIT @ [FUREWEB](https://fureweb-com.github.io)
