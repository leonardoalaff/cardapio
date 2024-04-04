const menu = document.querySelector('#menu')
const cartBtn = document.querySelector('#cart-btn')
const cartModal = document.querySelector('#cart-modal')
const cartItemsContainer = document.querySelector('#cart-items')
const cartTotal = document.querySelector('#cart-total')
const checkout = document.querySelector('#checkout-btn')
const closeModalBtn = document.querySelector('#close-modal-btn')
const cartCounter = document.querySelector('#cart-count')
const addressInput = document.querySelector('#address')
const addressWarn = document.querySelector('#address-warn')

let cart = []

//abrir modal do carrinho
cartBtn.addEventListener('click', () => {
    updateCartModal()
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
        const price = parseFloat(parentButton.getAttribute('data-price'))
            
        addToCart(name, price)
    }
})

//função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem) {
        existingItem.quantity += 1
        
    } else {

    cart.push({
        name,
        price,
        quantity: 1,
    })

}

updateCartModal()

}

//atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement('div')
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
             <div>
              <p class="font-medium">${item.name}</p>
              <p>Qtd: ${item.quantity}</p>
              <p clas="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
             </div>

              <button class="remove-from-cart-btn" data-name="${item.name}">
               Remover
              </button>

            </div>
        `

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    })

    cartCounter.innerHTML = cart.length

}


//função para remover o item do carrinho
cartItemsContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute('data-name')

        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1) {
        const item = cart[index]
        
        if(item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}