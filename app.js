"use strict";
let products = [];
let nextId = 1;
function addProduct(name, price, quantity) {
    const product = {
        id: nextId,
        name: name,
        price: price,
        quantity: quantity
    };
    products.push(product);
    nextId++;
    displayProducts();
}
function deleteProduct(id) {
    products = products.filter((product) => product.id !== id);
    displayProducts();
}
function calculateValue(product) {
    return product.price * product.quantity;
}
function displayProducts() {
    const table = document.getElementById("productTable");
    const emptyMessage = document.getElementById("emptyMessage");
    const totalProducts = document.getElementById("totalProducts");
    const totalItems = document.getElementById("totalItems");
    const totalValue = document.getElementById("totalValue");
    table.innerHTML = "";
    let itemCount = 0;
    let inventoryValue = 0;
    products.forEach((product) => {
        itemCount += product.quantity;
        inventoryValue += calculateValue(product);
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>₹${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>₹${calculateValue(product).toFixed(2)}</td>
      <td>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">
          Delete
        </button>
      </td>
    `;
        table.appendChild(row);
    });
    totalProducts.textContent = products.length.toString();
    totalItems.textContent = itemCount.toString();
    totalValue.textContent = `₹${inventoryValue.toFixed(2)}`;
    emptyMessage.style.display = products.length === 0 ? "block" : "none";
}
const form = document.getElementById("productForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (name === "" || price < 0 || quantity < 0) {
        alert("Please enter valid product details.");
        return;
    }
    addProduct(name, price, quantity);
    form.reset();
});
displayProducts();
