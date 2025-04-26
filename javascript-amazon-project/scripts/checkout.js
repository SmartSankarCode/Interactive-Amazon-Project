import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProductsFetch} from '../data/products.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

// async and await makes asynchronous code like normal code
// shortcut for promises
// easy to understand and makes less code when taking more data
async function loadPage() {
    await loadProductsFetch();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

// return promise using fetch
/*
loadProductsFetch().then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})
*/

// callbacks make our code more nesting
//promises keep our code more flat
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})
*/


/* this is callbacks
loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

