document.addEventListener("DOMContentLoaded", function () {
 const cartItems = []
 const cartItemsContainer = document.querySelector(".cart-items")
 const cartCount = document.querySelector(".cart-count")
 const totalPriceElement = document.querySelector(".total-price")
 const orderTotalPriceElement = document.querySelector(".order-total-price")
 const confirmOrderButton = document.querySelector(".confirm-order")
 const orderConfirmation = document.querySelector(".order-confirmation")
 const orderDetails = document.querySelector(".order-details")
 const startNewOrderButton = document.querySelector(".start-new-order")

 document.querySelectorAll(".add").forEach((button) => {
  button.addEventListener("click", function () {
   const itemName = this.parentElement.querySelector(".name").innerText
   const itemDescription = this.parentElement.querySelector(".name span ").innerText
   const itemPriceText = this.parentElement.querySelector(".price").innerText
   const itemImage = this.parentElement.querySelector(".img").src
   const itemPrice = parseFloat(itemPriceText.replace("$", "")) // Convert price to a number

   const existingItem = cartItems.find((item) => item.name === itemName)
   if (existingItem) {
    existingItem.quantity++
    existingItem.totalPrice = (existingItem.quantity * itemPrice).toFixed(2)
   } else {
    cartItems.push({ name: itemName, img: itemImage, price: itemPrice, quantity: 1, descrption: itemDescription, totalPrice: itemPrice.toFixed(2) })
   }

   updateCart()
  })
 })

 function updateCart() {
  cartItemsContainer.innerHTML = ""
  cartItems.forEach((item) => {
   const cartItem = document.createElement("div")
   cartItem.classList.add("cart-item")
   cartItem.innerHTML = `
      <div>${item.descrption}</div>
      <div>Qty: ${item.quantity}</div>
      <div>$${item.totalPrice}</div>
      <button class="remove-item">X</button>
    `
   cartItem.querySelector(".remove-item").addEventListener("click", function () {
    removeCartItem(item.name)
   })
   cartItemsContainer.appendChild(cartItem)
  })

  function updateCount(button, change) {
   const itemCountElement = button.closest(".grid-item").querySelector(".item-count")
   let count = parseInt(itemCountElement.innerText, 10)
   count += change
   if (count < 0) count = 0 // Prevent negative count
   itemCountElement.innerText = count
   const gridItem = button.closest(".grid-item")

   // Hide the "Add to Cart" button
   button.style.display = "none"

   // Show the count buttons
   const countButtons = gridItem.querySelector(".count-buttons")
   countButtons.style.display = "block"
   // Optionally, toggle the visibility of buttons
   const decrementButton = button.closest(".count-buttons").querySelector(".count-button:first-child")
   decrementButton.style.display = count > 0 ? "inline" : "none"
  }
  // Update cart count and total price
  const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  cartCount.innerText = totalItemCount // Total quantity of all items
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0)
  totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`
 }
 function updateCount(button, change) {
  const itemCountElement = button.parentElement.previousElementSibling
  let count = parseInt(itemCountElement.innerText, 10)
  count += change
  if (count < 0) count = 0 // Prevent negative count
  itemCountElement.innerText = count

  // Optionally, toggle the visibility of buttons
  button.parentElement.querySelector(".count-button:first-child").style.display = count > 0 ? "inline" : "none"
 }
 function removeCartItem(name) {
  const itemIndex = cartItems.findIndex((item) => item.name === name)
  if (itemIndex > -1) {
   cartItems.splice(itemIndex, 1)
   updateCart()
  }
 }

 confirmOrderButton.addEventListener("click", function () {
  if (cartItems.length === 0) {
   alert("You must add at least one item to your cart before confirming the order.")
   return
  }
  orderDetails.innerHTML = ""
  cartItems.forEach((item) => {
   const orderItem = document.createElement("li")
   orderItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}
      `
   orderDetails.appendChild(orderItem)
  })

  orderTotalPriceElement.innerText = totalPriceElement.innerText
  orderConfirmation.style.display = "block"
 })

 startNewOrderButton.addEventListener("click", function () {
  cartItems.length = 0 // Clear cart
  updateCart()
  orderConfirmation.style.display = "none"
 })
})
