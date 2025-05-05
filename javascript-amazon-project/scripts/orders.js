import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";

async function loadPage() {
    await loadProductsFetch();
    loadOrdersPage();
}

loadPage();



function loadOrdersPage() {

    let  ordersSummaryHtml = '';
    orders.forEach(order => {

        ordersSummaryHtml +=
                         `
                        <div class="order-container">
          
                            <div class="order-header">
                                <div class="order-header-left-section">
                                <div class="order-date">
                                    <div class="order-header-label">Order Placed:</div>
                                    <div>${dayjs(order.orderTime).format('MMMM D')}</div>
                                </div>
                                <div class="order-total">
                                    <div class="order-header-label">Total:</div>
                                    <div>₹${order.totalCostCents.toFixed(2)}</div>
                                </div>
                                </div>

                                <div class="order-header-right-section">
                                <div class="order-header-label">Order ID:</div>
                                <div>${order.id}</div>
                                </div>
                            </div>

                            <div class="order-details-grid">
                                ${orderList(order)}
                            </div>
                        </div>
                        `;
    })

    function orderList(order) {
        let listItems = '';

        order.products.forEach(product => {
            const matchingItem = getProduct(product.productId)
            
            listItems +=
                    `
                    <div class="product-image-container">
                        <img src="${matchingItem.image}">
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            ${matchingItem.name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary js-buy-again-button"
                        data-product-id="${matchingItem.id}">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                    </div>
                    `;
        });

        return listItems;
    }

    document.querySelector('.js-orders-grid').innerHTML = ordersSummaryHtml;

    document.querySelectorAll(`.js-buy-again-button`).forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            button.innerText = 'Added';

            setTimeout(() => {
                button.innerHTML = `
                                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                                    <span class="buy-again-message">Buy it again</span>
                                    `;
            }, 1000);

            addToCart(productId, 1);
        })
    })
}