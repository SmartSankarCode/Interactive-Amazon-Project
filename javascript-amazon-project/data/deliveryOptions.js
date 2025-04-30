export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceRupees: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceRupees: 499  
}, {
    id: '3',
    deliveryDays: 1,
    priceRupees: 999
}]

export function getDeliveryOption(deliveryOptionId) {
    let option;

    deliveryOptions.forEach((deliveryOptionEach) => {
      if(deliveryOptionEach.id === deliveryOptionId){
        option = deliveryOptionEach;
      }
    })
    return option || deliveryOptions[0];
}