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
You can get JSON data by sending an http request with the following path: 

http://api.fureweb.com/exchangeRate/

## License
MIT @ [FUREWEB](https://fureweb-com.github.io)
