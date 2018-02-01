# KRW Exchange rate to JSON

고시된 환율 정보 및 특정 국가 화폐에 대한 환율 정보를 쉽고 빠르게 얻을 수 있습니다.

## 설치
```
npm install --save krw-exchange-rate-to-json
```

## 사용 방법
```js
const {getExchangeRateDataFromWebPage, convertCurrency} = require('krw-exchange-rate-to-json')

// 최종 고시된 환율 정보를 얻어올 때
getExchangeRateDataFromWebPage().then(
    r => console.log(r),
    err => console.error(err)
)

// 특정 화폐에 대한 환율 정보를 얻어올 때(현금 살때, 팔때 기준)
// 첫번째 인자로 ISO 4217에 해당하는 화폐 코드를 전달해야 정상적인 결과를 얻을 수 있습니다.
convertCurrency('USD').then(
    r => console.log(r),
    err => console.error(err)
)
```

## WEB API

### 설명
다음의 경로를 통해 언제든 필요할 때 데이터를 요청할 수 있습니다.

1. 최종 고시된 환율 정보를 다음의 URL을 통해 얻어올 수 있습니다.
http://api.fureweb.com/exchangeRate/

2. 특정 화폐에 대한 환율 정보를 다음의 URL을 통해 얻어올 수 있습니다.
http://api.fureweb.com/exchangeRate/ISO4217CODE (ignore case)

### 사용예제

1. 미국 달러화에 대한 원화 환율 정보를 얻어올 때
http://api.fureweb.com/exchangeRate/USD

2. 일본 엔화에 대한 원화 환율 정보를 얻어올 때
http://api.fureweb.com/exchangeRate/JPY

### ISO 4217 코드
아래 링크의 자료를 참고하세요.

[https://en.wikipedia.org/wiki/ISO_4217](https://en.wikipedia.org/wiki/ISO_4217)

### 데이터 포맷

- 전체 환율정보 (getExchangeRateDataFromWebPage)
```javascript
{
    requestDate: "Number", // 요청일시
    date: "Number", // 고시일시
    times: "Number", // 고시회차
    data: [
        {
            countryName: "String", // 국가명
            currencyCode: "String", // ISO 4217 Code
            cash: { // 현찰
                buy: { // 살때
                    exchangeRate: "Number",
                    spread: "Number" 
                },
                sell: { // 팔때
                    exchangeRate: "Number",
                    spread: "Number" 
                }
            },
            remittance: { // 송금
                send: "Number",
                receive: "Number"
            },
            travelersCheck: { // 여행자수표
                buy: "Number"
            },
            foreignCurrencyCheck: { // 외화수표
                sell: "Number"
            },
            tradingStandardRate: "Number", // 매매 기준율
            exchangeFee: "Number", // 환가료율
            USDConversionRate: "Number" // 미화 환산율
        }
    ]
};
```

- 특정 화폐 환율 정보 (convertCurrency)
```javascript
{
    requestedTime: "Number", // 요청시간 Timestamp
    sell: "Number", // 현금 살때 기준
    buy: "Number", // 현금 팔때 기준
    remittance: {
        send: "Number", // 송금 보낼때
        receive: "Number" // 송금 받을때
    }
}
```

## LICENSE
MIT @ [FUREWEB](https://fureweb-com.github.io)
