const money = document.querySelector("#currencies");
const input = document.querySelector("#money");
const result = document.querySelector(".counted");
const btn = document.getElementById("btn");

let currencyValue;
const apiUrl = {
  EUR: "https://api.nbp.pl/api/exchangerates/rates/a/eur/",
  USD: "https://api.nbp.pl/api/exchangerates/rates/a/usd/",
  CHF: "https://api.nbp.pl/api/exchangerates/rates/a/chf/",
};

const selectedCurrency = money.value;
const url = apiUrl[selectedCurrency];
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const currencyList = data.rates;
    currencyValue = currencyList[0].mid;
  })
  .catch((error) => alert(error));

money.addEventListener("change", () => {
  const selectedCurrency = money.value;
  const url = apiUrl[selectedCurrency];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencyList = data.rates;
      currencyValue = currencyList[0].mid;
    })
    .catch((error) => alert(error));
});

const calculate = () => {
  const amount = input.value;
  const calculatedValue = amount * currencyValue;
  result.innerHTML = calculatedValue.toFixed(2) + " PLN";
};

btn.addEventListener("click", () => {
  btn.classList.add("spin-animation");
  setTimeout(() => {
    calculate();
    btn.classList.remove("spin-animation");
  }, 2000);
});
