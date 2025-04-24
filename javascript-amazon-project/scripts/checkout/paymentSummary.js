import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
    let productPriceRupees = 0;
    let shippingPriceRupees = 0;
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceRupees += product.getPrice() * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceRupees += deliveryOption.priceRupees;

        cartQuantity += cartItem.quantity;
    });
    const total = productPriceRupees + shippingPriceRupees;
    const discountTenPercent = total * 0.1;
    const orderTotal = total - discountTenPercent;

    const paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">₹${productPriceRupees.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingPriceRupees.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total:</div>
            <div class="payment-summary-money">₹${total.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Discount Applied(10%):</div>
            <div class="payment-summary-money">- ₹${discountTenPercent.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${orderTotal.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
        `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}
