const money = document.querySelector("#currencies");
const input = document.querySelector("#money");
const result = document.querySelector(".counted");
const form = document.querySelector(".converter");

const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/a/";

const fetchCurrencyData = (selectedCurrency) => {
  const url = `${apiUrl}${selectedCurrency}/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data?.rates?.length > 0 && data.rates[0].mid) {
        const currencyValue = data.rates[0].mid;
        calculate(currencyValue);
      } else {
        alert("Failed to read currency converter");
      }
    })
    .catch((error) => alert(error));
};

const calculate = (currencyValue) => {
  const amount = Number(input.value.replace(",", "."));
  const calculatedValue = amount * currencyValue;
  result.textContent = calculatedValue.toFixed(2) + " PLN";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = parseFloat(input.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a value greater than 0");
    return;
  }
  const selectedCurrency = money.value;
  fetchCurrencyData(selectedCurrency);
});
