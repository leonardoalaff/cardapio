const menu = document.querySelector('#menu')
const cartBtn = document.querySelector('#cart-btn')
const cartModal = document.querySelector('#cart-modal')
const cartItemsContainer = document.querySelector('#cart-items')
const total = document.querySelector('#cart-total')
const checkout = document.querySelector('#checkout-btn')
const closeModalBtn = document.querySelector('#close-modal-btn')
const cartCounter = document.querySelector('#cart-count')
const addressInput = document.querySelector('#address')
const addressWarn = document.querySelector('#address-warn')

let cart = []

//abrir modal do carrinho
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex'
})

//fechar o modal quando clicar fora
cartModal.addEventListener('click', (event) => {
    if(event.target === cartModal) {
        cartModal.style.display = 'none'
    }
})

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none'
})

menu.addEventListener('click', (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn')

    if(parentButton) {
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute)
            
        addToCart(name, price)
    }
})

//função para adicionar no carrinho
function addToCart(name, price) {
    cart.push({
        name,
        price,
        quantity: 1,
    })

}