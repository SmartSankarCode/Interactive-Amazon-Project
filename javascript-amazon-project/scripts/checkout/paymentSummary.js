import { cart, resetCart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrders } from '../../data/orders.js';

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
    const taxTenPercent = Math.round(total * 0.1);
    const orderTotal = total + taxTenPercent;

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
            <div>Tax Applied(10%):</div>
            <div class="payment-summary-money">₹${taxTenPercent.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${orderTotal.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary
        js-place-order">
            Place your order
        </button>
        `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    if(cart.length === 0) {
        const placeOrderbtn = document.querySelector('.js-place-order');
        placeOrderbtn.classList.remove('place-order-button');
        placeOrderbtn.classList.add('place-order-button-disabled');
        return;
    }

    document.querySelector('.js-place-order').addEventListener('click', async () => {

        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart.map(cartItem => {
                        return {
                            productId: cartItem.productId,
                            quantity: cartItem.quantity,
                            deliveryOptionId: cartItem.deliveryOptionsId
                        }
                    })
                })
            });

            const order = await response.json();
            addOrders(order);

            window.location.href = 'orders.html';

            resetCart();

        } catch (error) {
            console.log(`Unexpected error. Please try again later.`)
        }

    })
}
