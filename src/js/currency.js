import axios from 'axios';

export const key = 'currency';
const selectedCurrency = localStorage.getItem(key) ?? 'usd';

const currencySelectionEl = document.getElementById('currency-selection');
currencySelectionEl.value = selectedCurrency;

const headerEl = document.querySelector('header');
const freeSheepingMinPriceEl = headerEl.querySelector('.price');
const renderFreeSheepingMinPrice = async (selectedCurrency) =>
  (freeSheepingMinPriceEl.textContent = await convert(
    100,
    'usd',
    selectedCurrency
  ));
(async () => await renderFreeSheepingMinPrice(selectedCurrency))();

currencySelectionEl.addEventListener('change', async function () {
  const { value } = this;
  localStorage.setItem(key, value);
  await renderFreeSheepingMinPrice(value);
});

export async function convert(money, currency, selectedCurrency) {
  const res1 = await axios.get(
    `https://currency-rate-exchange-api.onrender.com/${currency}`
  );
  const res2 = await axios.get(
    `https://currency-rate-exchange-api.onrender.com/${selectedCurrency}`
  );

  const convertedMoney =
    Number(res1.data.rates[currency][selectedCurrency]) * money;
  const currencySymbol = res2.data.currencySymbol;

  return formatMoney(convertedMoney, currencySymbol);
}

function formatMoney(money, symbol) {
  return `${symbol} ${money.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
