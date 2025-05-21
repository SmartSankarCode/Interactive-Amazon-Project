import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || [
    
    {
        "id": "e3909445-02c3-4fd5-8738-san93kar69",
        "orderTime": "2025-05-09T20:57:02.235Z",
        "totalCostCents": 1859,
        "products": [
            {
            "productId": "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
            "quantity": 1,
            "estimatedDeliveryTime": "2025-05-16T20:57:02.235Z"
            }
        ]
    }

  ]

export function addOrders(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach(order => {
        if(order.id === orderId) {
            matchingOrder = order;
        }
    })

    return matchingOrder;
}

// Date.now() - 1000 * 60 * 60 * 5
// .calculateDeliveryDate() - 1000 * 60 * 60 * 5