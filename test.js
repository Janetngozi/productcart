const products = [
  {
    category: "Waffle",
    name: "Waffle with Berries",
    price: 6.5,
    image: "./assets/images/image-waffle-mobile.jpg",
  },
  {
    category: "Crème Brûlée",
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    image: "./assets/images/image-creme-brulee-mobile.jpg",
  },
  {
    category: "Macaron",
    name: "Macaron Mix of Five",
    price: 8.0,
    image: "./assets/images/image-macaron-mobile.jpg",
  },
  {
    category: "Tiramisu",
    name: "Classic Tiramisu",
    price: 5.5,
    image: "./assets/images/image-tiramisu-mobile.jpg",
  },
  {
    category: "Baklava",
    name: "Pistachio Baklava",
    price: 4.0,
    image: "./assets/images/image-baklava-mobile.jpg",
  },
  {
    category: "Pie",
    name: "Lemon Meringue Pie",
    price: 5.0,
    image: "./assets/images/image-meringue-mobile.jpg",
  },
  {
    category: "Cake",
    name: "Red Velvet Cake",
    price: 4.5,
    image: "./assets/images/image-cake-mobile.jpg",
  },
  {
    category: "Brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    image: "./assets/images/image-brownie-mobile.jpg",
  },
  {
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    image: "./assets/images/image-panna-cotta-mobile.jpg",
  },
];

const productList = document.querySelector("#product-list");

productList.innerHTML = products
  .map((product) => {
    return `
<div class="product">
        <div class="image">
                <img src="${product.image}" alt="" />
                <button class="add-to-cart">
                        <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                        <p>Add to Cart</p>
                </button>
        </div>
        <div class="text">
                <h4>${product.category}</h4>
                <h3 class="product-name">${product.name}</h3>
                <h2 class="product-price">${product.price.toFixed(2)}</h2>
        </div>
</div>
        `;
  })
  .join("");

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");

// Load cart from localStorage or initialize as empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = products[index];
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order");
    itemDiv.innerHTML = `
        <div class="order-image">
        
        <div class="arrange">
            <h3>${item.name}</h3>
            <div class="order-detax">
                <h3>${item.quantity}x</h3>
                <p class="order-details">@$${item.price.toFixed(
                  2
                )}<span class="order-detail">$${itemTotal.toFixed(2)}</span></p>
               
            </div>
        </div>
         <button class="icon-circle" data-index="${idx}" title="icon-circle">
                   X
                </button>
        </div>
        `;

    cartItemsContainer.appendChild(itemDiv);
  });

  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;

  // Add event listeners for delete buttons
  const deleteButtons = cartItemsContainer.querySelectorAll(".icon-circle");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });
}

// Update UI on page load with persisted cart
updateCartUI();
