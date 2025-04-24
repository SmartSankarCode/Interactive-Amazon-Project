import { cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(){ //refreshes the page (Recursion technique)

  let cartSummaryHtml = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;

    const option = getDeliveryOption(deliveryOptionId)

    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ₹${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link"
                    data-product-id = ${matchingProduct.id}>
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link"
                    data-product-id = ${matchingProduct.id}>
                      Save 
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link"
                    data-product-id = ${matchingProduct.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`;
  })

  function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = option.priceRupees === 0 ? 'Free': `₹${option.priceRupees} -`

      const isChecked = option.id === cartItem.deliveryOptionsId;
      
      html += `<div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${option.id}">
                <input type="radio"
                  ${isChecked? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
              </div>`
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderCheckoutHeader();

      renderOrderSummary();

      renderPaymentSummary();
    })
  })

  document.querySelectorAll('.delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId , deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  
document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.classList.add('is-editing-quantity');
  })
})

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
  
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);

    updateQuantity(productId, newQuantity);

    renderCheckoutHeader();

    renderOrderSummary();

    renderPaymentSummary();
  })
})
}
