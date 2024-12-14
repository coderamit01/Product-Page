const addToCart = document.querySelector('.cart-btn');
const productImage = document.querySelector('.product-image');
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

// Get stored products from localstorage
const getStoredData = () => {
  const storedData = JSON.parse(localStorage.getItem('cart'));
  return storedData ? storedData : [];
};

// Set products to localstorage
const setProductData = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

// Added to Cart Product Function 
const handleAddToCart = () => {
  const checkoutQty = document.querySelector('.checkout-qty'); 
  const cart = [];
  addToCart.addEventListener('click', () => {
    const colorWarning = document.querySelector('.color-warning');
    const sizeWarning = document.querySelector('.size-warning');
    const colorChecked = document.querySelector('.vr-colors input:checked');
    const sizeChecked = document.querySelector('.vr-sizes input:checked');
    // check is color or size selected 
    if(!colorChecked){
      colorWarning.style.display = 'block';
      return;
    }
    if(!sizeChecked){
      sizeWarning.style.display = 'block';
      return;
    }
    const productImg = productImage.src;
    const productTitle = document.querySelector('.product-title').textContent.trim();
    const productQuantity = document.querySelector('.qty').textContent.trim();
    const productColor = colorChecked?.nextElementSibling.dataset.color;
    const productPrice = sizeChecked?.nextElementSibling?.children[1]?.children[0].textContent.trim();
    const producSize = sizeChecked?.nextElementSibling?.children[0]?.textContent;
    // Create a object to store the product details 
    const product = {
      img: productImg,
      title: productTitle,
      quantity: productQuantity,
      color: productColor,
      size: producSize,
      price: productPrice
    };

    cart.push(product);
    console.log(cart);



    setProductData(cart);


    checkoutQty.innerHTML = cart.length;

    colorWarning.style.display = 'none';
    sizeWarning.style.display = 'none';
  });
  
};
// Initialize the Add To Cart Function 
handleAddToCart();


// Show cart items in checkout modal 