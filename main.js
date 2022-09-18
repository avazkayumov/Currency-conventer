// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function(result) {
//     return result.json()
// }).then (function(data) {
//     console.log(data)
// })

const rates = {}

const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementUZS = document.querySelector('[data-value="UZS"]')

const input = document.querySelector('#input')
const result = document.querySelector('#result')
const select = document.querySelector('#select')

getCurrencies()
setInterval(getCurrencies, 10000)

async function getCurrencies () {
   const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
   const data = await response.json()
   const result = await data

   rates.USD = result.Valute.USD
   rates.EUR = result.Valute.EUR
   rates.UZS = result.Valute.UZS

   // console.log(rates)

   elementUSD.textContent = rates.USD.Value.toFixed(2)
   elementEUR.textContent = rates.EUR.Value.toFixed(2)
   elementUZS.textContent = rates.UZS.Value.toFixed(2)

   // color for USD
   if (rates.USD.Value > rates.USD.Previous) {
      elementUSD.classList.add('top')
   }else if (rates.USD.Value < rates.USD.Previous) {
      elementUSD.classList.add('bottom')
   }
   // color for EUR
   if (rates.EUR.Value > rates.EUR.Previous) {
      elementEUR.classList.add('top')
   }else if (rates.EUR.Value < rates.EUR.Previous) {
      elementEUR.classList.add('bottom')
   }
   // color for UZS
   if (rates.UZS.Value > rates.UZS.Previous) {
      elementUZS.classList.add('top')
   }else if (rates.UZS.Value < rates.UZS.Previous) {
      elementUZS.classList.add('bottom')
   }
}

input.oninput = convertValue

select.oninput = convertValue

function convertValue() {
   result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)
}