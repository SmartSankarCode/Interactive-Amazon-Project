class Cart {
    cartItems;
    #localStoragekey; // # makes private property

    constructor(localStoragekey){
        this.#localStoragekey = localStoragekey;
        this.#loadfromStorage();
    }

    #loadfromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey)) // || []; 
    
        if(!this.cartItems){
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2,
                deliveryOptionsId: '1'
            },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionsId: '2'  
            }];
        } 
    };

    saveToStorage(){
        localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
    };

    addToCart(productId, quantity){
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        })
        
        if(matchingItem){
            matchingItem.quantity += quantity;
        }
        else{
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionsId: '1'
            })
        }
        this.saveToStorage();
    };

    removeFromCart(productId){
        let newCart = [];
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        })
    
        this.cartItems = newCart
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {

        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        })
    
        matchingItem.deliveryOptionsId = deliveryOptionId;
    
        this.saveToStorage();
    };

    updateQuantity(productId, newQuantity){
        let matchingItem;
        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        })
    
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const bussinesscart = new Cart('cart-class');


console.log(cart);
console.log(bussinesscart);


