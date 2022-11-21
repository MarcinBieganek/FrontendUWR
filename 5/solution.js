let productsList = [];

/**
 * Adds product to products list.
 * @param {string} name - Product name.
 * @param {number} number - Product quantity.
 * @param {Date} buyDate - Product buy date.
 * @param {boolean} bought - Is product bought already.
 * @param {number} itemPrice - Product item price.
 * @returns {number} Product id.
 */
function addProduct(name, number, buyDate, bought, itemPrice) {
    const id = Math.floor(Math.random() * 1000000000);
    productsList.push({
        id: id,
        name: name,
        number: number,
        buyDate: buyDate,
        bought: bought,
        itemPrice: itemPrice
    })
    return id;
}

/**
 * Delete product from products list.
 * @param {number} id - Product id.
 */
function deleteProduct(id) {
    productsList = productsList.filter(function (product) {
        return product.id !== id;
    });
}

/**
 * Edit product name.
 * @param {number} id - Product id.
 * @param {string} name - Product new name.
 */
function editProductName(id, name) {
    let productIndex = productsList.findIndex(function (product) {
        return product.id === id;
    });
    if (productIndex === -1) return;
    productsList[productIndex].name = name;
}

/**
 * Edit product status.
 * @param {number} id - Product id.
 * @param {boolean} status - Product new staus.
 */
 function editProductStatus(id, status) {
    let productIndex = productsList.findIndex(function (product) {
        return product.id === id;
    });
    if (productIndex === -1) return;
    productsList[productIndex].bought = status;
}

/**
 * Edit product items number.
 * @param {number} id - Product id.
 * @param {number} number - Product new quantity.
 */
 function editProductNumber(id, number) {
    let productIndex = productsList.findIndex(function (product) {
        return product.id === id;
    });
    if (productIndex === -1) return;
    productsList[productIndex].number = number;
}

/**
 * Edit product buy date.
 * @param {number} id - Product id.
 * @param {Date} buyDate - Product new buy date.
 */
 function editProductBuyDate(id, buyDate) {
    let productIndex = productsList.findIndex(function (product) {
        return product.id === id;
    });
    if (productIndex === -1) return;
    productsList[productIndex].buyDate = buyDate;
}

/**
 * Swap to products on the products list.
 * @param {number} id1 - First product id.
 * @param {number} id2 - Second product id.
 */
function swapProductsPosition(id1, id2) {
    let product1Index = productsList.findIndex(function (product) {
        return product.id === id1;
    });
    let product2Index = productsList.findIndex(function (product) {
        return product.id === id2;
    });
    let product1 = productsList.splice(product1Index, 1, productsList[product2Index]);
    productsList.splice(product2Index, 1, product1);
}

/**
 * Finds products to buy today.
 * @returns {Array} List of products to buy today.
 */
function getProductsToBuyToday() {
    const today = new Date();
    return productsList.filter(function (product) {
        return ((today.getDate() === product.buyDate.getDate()) && (today.getMonth() === product.buyDate.getMonth()) && (today.getFullYear() === product.buyDate.getFullYear()));
    });
}

/**
 * Set product item price.
 * @param {number} id - Product id.
 * @param {number} price - Product item price.
 */
function setItemPrice(id, price) {
    let productIndex = productsList.findIndex(function (product) {
        return product.id === id;
    });
    if (productIndex === -1) return;
    productsList[productIndex].itemPrice = price;
}



console.log(productsList);

addProduct("Product 1", 2, new Date(), false, 20.0);
addProduct("Product 2", 1, new Date(2023, 11, 17), false, 10.0);
addProduct("Product 3", 1, new Date(), false);

console.log(productsList);

let thisYearProducts = getProductsToBuyToday();

console.log(thisYearProducts);
