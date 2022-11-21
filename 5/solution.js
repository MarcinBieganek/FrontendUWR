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
    productsList[productIndex].name = name;
}

console.log(productsList);

addProduct("Product 1", 2, Date.now(), false, 20.0);

console.log(productsList);

let i = productsList[0].id;

editProductName(i, "New product");

console.log(productsList);
