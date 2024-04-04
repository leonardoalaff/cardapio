const menu = document.querySelector('#menu')
const cartBtn = document.querySelector('#cart-btn')
const cartModal = document.querySelector('#cart-modal')
const cartItemsContainer = document.querySelector('#cart-items')
const cartTotal = document.querySelector('#cart-total')
const checkoutBtn = document.querySelector('#checkout-btn')
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


addressInput.addEventListener('input', (event) => {
    let inputValue = event.target.value

    if(inputValue !== "") {
        addressInput.classList.remove('border-red-500')
        addressWarn.classList.add('hidden')
    }
})

//finalizar pedido
checkoutBtn.addEventListener('click', () => {

    const isOpen = checkRestaurantOpen()
    if(!isOpen) {
        Toastify({
            text: "Ops! O restaurante está fechado!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            }}).showToast()

            return
    }

    if(cart.length === 0) return

    if(addressInput.value === "") {
        addressWarn.classList.remove('hidden')
        addressInput.classList.add('border-red-500')
        return
    }

    //enviar pedido para api whatsapp
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Qtd: (${item.quantity}) Preço: ${item.price.toFixed(2)} | cada \n \n`
        )
    }).join("")


    let totalValue = 0;
    cart.forEach(item => {
        totalValue += item.price * item.quantity;
    })

    const message = encodeURIComponent(cartItems)
    const phone = "5533984523678"
    const saudacao = `OLÁ, EU GOSTARIA DE FAZER UM PEDIDO:`

    window.open(`https://wa.me/${phone}?text=${saudacao}%0A %0A %0A${message}%0A TOTAL: ${totalValue.toFixed(2)}%0AENDEREÇO: ${addressInput.value}`, "_blank")

    cart = []
    updateCartModal()
})


//verificar a hora e manipular o card do horário
function checkRestaurantOpen() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22
    //restaurante está aberto
}

const spanItem = document.querySelector('#date-span')
const isOpen = checkRestaurantOpen()

if(isOpen) {
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600')
} else {
    spanItem.classList.remove('bg-green-600')
    spanItem.classList.add('bg-red-500')
}