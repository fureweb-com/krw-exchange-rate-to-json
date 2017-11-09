const cheerio = require("cheerio")
const request = require("request")

const options = {
    url: "https://www.kebhana.com/cms/rate/wpfxd651_01i_01.do?ajax=true&pbldDvCd=3",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
        "Connection": "keep-alive"
    }
}

const replaceStringNumberToRealNumber = (str) => Number(str.replace(/,/g, ""))

const removeEmptyArray = (arr) => {
    const result = []
    arr.forEach(row => row ? result.push(row) : null)
    return result
}

const makeExchangeRateInformationMapFromArray = (exchangeRateInfomationArray) => {
    // 국가명 / 환율코드 / 현찰: 살때, 팔때 / 송금: 보낼때, 받을때 / 여행자수표: 살때 / 외화수표: 팔때 / 매매기준율 / 환가료율 / 미화환산율
    return {
        countryName: exchangeRateInfomationArray[0],
        currencyCode: exchangeRateInfomationArray[1],
        cash: {
            buy: {
                exchangeRate: replaceStringNumberToRealNumber(exchangeRateInfomationArray[2]),
                spread: replaceStringNumberToRealNumber(exchangeRateInfomationArray[3])
            },
            sell: {
                exchangeRate: replaceStringNumberToRealNumber(exchangeRateInfomationArray[4]),
                spread: replaceStringNumberToRealNumber(exchangeRateInfomationArray[5])
            }
        },
        remittance: {
            send: replaceStringNumberToRealNumber(exchangeRateInfomationArray[6]),
            receive: replaceStringNumberToRealNumber(exchangeRateInfomationArray[7])
        },
        travelersCheck: {
            buy: replaceStringNumberToRealNumber(exchangeRateInfomationArray[8])
        },
        foreignExchangeRateCheck: {
            sell: replaceStringNumberToRealNumber(exchangeRateInfomationArray[9])
        },
        tradingStandardRate: replaceStringNumberToRealNumber(exchangeRateInfomationArray[10]),
        exchangeFee: replaceStringNumberToRealNumber(exchangeRateInfomationArray[11]),
        USDConversionRate: replaceStringNumberToRealNumber(exchangeRateInfomationArray[12])
    }
}

const getExchangeRateDataFromWebPage = () => new Promise((resolve, reject) => {
        request.post(options, (error, response, html) => {
            // 요청일시, 기준일시, 고시회차, 환율데이터
            let result = {requestDate: Date.now(), date: undefined, times: undefined, data: []}
            const $ = cheerio.load(html)
            
            // 고시정보
            $(".txtRateBox .fl").find("strong").each((index, element) => {
                const target = $(element).text()

                switch (index) {
                    case 0: result.date = target.replace(/년|월/g, "-").replace(/일/, ""); break
                    case 1: result.times = Number(target.replace(/회차/, "")); break
                    case 2: result.date = new Date(`${result.date} ${target.replace(/시|분/g, ":").replace(/초/, "")}`).getTime(); break
                }
            })

            // 환율정보
            $("table tr").each((index, element) => {
                const target = $(element).text().replace(/\(100\)/, '').replace(/\n|\t/g, " ")
                
                // header 부분 미처리
                if(index < 3) return

                const exchangeRateInfomationArray = removeEmptyArray(target.split(" "))
                result.data.push(makeExchangeRateInformationMapFromArray(exchangeRateInfomationArray))
            })
            resolve(result)
        })
    }
)

module.exports = getExchangeRateDataFromWebPage