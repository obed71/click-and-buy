import axios from 'axios';
import { convert, key } from './currency';

(async () => {
  await renderHighRatedProducts();
})();

const currencySelectionEl = document.getElementById('currency-selection');

currencySelectionEl.addEventListener('change', () => {
  const products = document.querySelectorAll('.hight-rated-products .product');

  products.forEach(async (product) => {
    const priceEl = product.querySelector('.price');
    const symbolEl = product.querySelector('.symbol');

    const oldPrice = Number(priceEl.innerHTML.replace(',', ''));
    const oldCurrency = symbolEl.getAttribute('data-currency');

    const newCurrency = currencySelectionEl.value;
    const convertedPrice = await convert(oldPrice, oldCurrency, newCurrency);

    const [symbol, price] = convertedPrice.split(' ');

    priceEl.innerHTML = price;
    symbolEl.innerHTML = symbol;
    symbolEl.setAttribute('data-currency', newCurrency);
  });
});

async function renderHighRatedProducts() {
  const products = await getAllProducts();
  const highRatedProducts = products.filter(
    (product) => product.rating.rate >= 4.5
  );
  const productsContainer = document.querySelector('.hight-rated-products');
  productsContainer.innerHTML = '';

  highRatedProducts.forEach(async (product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    const { price, image, title, rating } = product;
    const currency = localStorage.getItem(key);
    const convertedPrice = await convert(price, 'usd', currency);
    const [symbol, realPrice] = convertedPrice.split(' ');

    productElement.innerHTML = `
        <div class="product-image">
          <img src="${image}" alt="${title}">
        </div>
        <div class="product-info">
          <h2 class="title">${title}</h2>
          <p>
            <i class="fas fa-star icon"></i>
            ${rating.rate}
            <span class="symbol" data-currency="${currency}">${symbol}</span>
            <span class="price">${realPrice}</span>
          </p>
          <h3 class="category">${product.category}</h3>
        </div>
      `;

    productsContainer.appendChild(productElement);
  });
}

async function getAllProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
