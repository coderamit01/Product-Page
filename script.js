const addToCart = document.querySelector('.cart-btn');
const productImage = document.querySelector('.product-image');
const checkOutButton = document.querySelector('.checkout-btn');
// updating the product image
const handleVariableImage = () => {
  const variableColors = document.querySelectorAll('.vr-colors span');
  variableColors.forEach(item => {
    item.addEventListener('click', () => {
      const imgUrl = item.getAttribute('data-image');
      productImage.src = imgUrl;
    })
  });
};
// Initialize the function handleVariableImage()
handleVariableImage();

// Update Product Quantity 
const updateProductQuantity = () => {
  const minus = document.querySelector('.minus');
  const qty = document.querySelector('.qty');
  const plus = document.querySelector('.plus');

  let count = 1;
  const updateQty = () => {
    qty.textContent = count;
  }
  // Increase the Product quantity 
  plus.addEventListener('click', () => {
    count++;
    updateQty();
  });
  // Decrease the Product quantity
  minus.addEventListener('click', () => {
    count > 1 && count--;
    updateQty();
  });
};
updateProductQuantity();
// Initialize Product Quantity Function

// Get stored products from localStorage
const getStoredData = () => {
  const storedData = JSON.parse(localStorage.getItem('cart'));
  return storedData ? storedData : [];
};

// Set products to localStorage
const setProductData = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

// cart items
const showCartItems = () => {
  const cart = getStoredData();
  const cartItems = document.querySelector('.cart-list');

  cartItems.innerHTML = '';

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQty += parseInt(item.quantity);
    totalPrice += parseInt(item.price) * parseInt(item.quantity);

    cartItems.innerHTML += `
    <tr>
      <td class="d-flex align-items-center gap-2">
        <img src='${item.img}' alt='${item.title}' class="cart-img">
        <span class="ct-title">${item.title}</span>
      </td>
      <td>${item.color}</td>
      <td class="fw-bold text-tblack">${item.size}</td>
      <td class="fw-bold text-tblack ct-qty">${item.quantity}</td>
      <td class="fw-bold text-tblack">$<span class="ct-price">${item.price}</span></td>
    </tr>
    `;
  });
  
  // Total Quantity 
  document.querySelector('.total-cart-qty').textContent = totalQty;
  document.querySelector('.cart-amount').textContent = parseFloat(totalPrice).toFixed(2);

}

// Added to Cart Product Function
const handleAddToCart = () => {
  const addToCartButton = document.querySelector('.cart-btn');

  addToCartButton.addEventListener('click', () => {
    const cart = getStoredData();
    const colorWarning = document.querySelector('.color-warning');
    const sizeWarning = document.querySelector('.size-warning');
    const colorChecked = document.querySelector('.vr-colors input:checked');
    const sizeChecked = document.querySelector('.vr-sizes input:checked');

    // Check if color or size is selected
    if (!colorChecked) {
      colorWarning.style.display = 'block';
      return;
    } else {
      colorWarning.style.display = 'none';
    }
    if (!sizeChecked) {
      sizeWarning.style.display = 'block';
      return;
    } else {
      sizeWarning.style.display = 'none';
    }

    // Get product details
    const productImage = document.querySelector('.product-image');
    const productImg = productImage.src;
    const productTitle = document.querySelector('.product-title').textContent.trim();
    const productQuantity = document.querySelector('.qty').textContent.trim();
    const productColor = colorChecked?.nextElementSibling.dataset.color;
    const productPrice = sizeChecked?.nextElementSibling?.children[1]?.children[0].textContent.trim();
    const productSize = sizeChecked?.nextElementSibling?.children[0]?.textContent;

    // Create a product object
    const product = {
      img: productImg,
      title: productTitle,
      quantity: productQuantity,
      color: productColor,
      size: productSize,
      price: productPrice,
    };
    // Check if the product already exists
    const existingProduct = cart.find(item =>
      item.title === productTitle && item.color === productColor && item.size === productSize
    );
    if (existingProduct) {
      existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(productQuantity);
    } else {
      cart.push(product);
    }
    // Save updated cart to localStorage
    setProductData(cart);
    document.querySelector('.checkout-qty').textContent = cart.length;
    checkOutButton.style.visibility = cart.length < 1 ? 'hidden' : 'visible';

    showCartItems();
  });
};
// Initialize the Add To Cart Function
handleAddToCart();

// Show total products in cart on page load
document.querySelector('.checkout-qty').textContent = getStoredData().length;
checkOutButton.style.visibility = getStoredData().length < 1 ? 'hidden' : 'visible';

showCartItems();