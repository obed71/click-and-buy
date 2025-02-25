import axios from 'axios';

(async () => {
  await renderHighRatedProducts();
})();

async function renderHighRatedProducts() {
  const products = await getAllProducts();
  const highRatedProducts = products.filter(
    (product) => product.rating.rate >= 4.5
  );
  const productsContainer = document.querySelector('.hight-rated-products');

  highRatedProducts.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h2 class="title">${product.title}</h2>
          <p class="rating">
            <i class="fas fa-star"></i>
            ${product.rating.rate}
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
