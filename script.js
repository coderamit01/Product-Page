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
// Added to Cart Product Function 
const handleAddToCart = () => {
  const checkoutQty = document.querySelector('.checkout-qty'); 
  const cart = [];
  addToCart.addEventListener('click', () => {
    const productImg = productImage.src;
    const productTitle = document.querySelector('.product-title').textContent.trim();
    const productPrice = document.querySelector('.price').textContent.trim();
    const productQuantity = document.querySelector('.qty').textContent.trim();
    const productColor = document.querySelector('.vr-colors input:checked')?.nextElementSibling.dataset.color;
    const producvPrice = document.querySelector('.vr-sizes input:checked')?.nextElementSibling?.children[1]?.children[0].textContent.trim();
    const producSize = document.querySelector('.vr-sizes input:checked')?.nextElementSibling?.children[0]?.textContent.trim();
    // Create a object to store the product details 
    const product = {
      img: productImg,
      title: productTitle,
      price: productPrice,
      quantity: productQuantity,
      color: productColor,
      size: producSize,
      pricev: producvPrice
    };

    cart.push(product);
    checkoutQty.innerHTML = cart.length;
  });
  
};
// Initialize the Add To Cart Function 
handleAddToCart();