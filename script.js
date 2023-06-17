const money = document.querySelector("#currencies");
const input = document.querySelector("#money");
const result = document.querySelector(".counted");
const btn = document.getElementById("btn");

const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/a/";

let currencyValue;

const fetchCurrencyData = (selectedCurrency) => {
  const url = `${apiUrl}${selectedCurrency}/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencyList = data.rates;
      if (currencyList.length > 0) {
        currencyValue = currencyList[0].mid;
      }
    })
    .catch((error) => alert(error));
};

const calculate = () => {
  const amount = input.value;
  const calculatedValue = amount * currencyValue;
  result.innerHTML = calculatedValue.toFixed(2) + " PLN";
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  calculate();
});

money.addEventListener("change", () => {
  const selectedCurrency = money.value;
  fetchCurrencyData(selectedCurrency);
});

input.addEventListener("input", () => {
  const amount = parseFloat(input.value);
  if (isNaN(amount) || amount < 0) {
    input.value = "";
  }
});

fetchCurrencyData(money.value);
