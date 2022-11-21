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

console.log(productsList);

addProduct("Product 1", 2, Date.now(), false, 20.0);

console.log(productsList);

let i = productsList[0].id;

editProductName(i, "New product");
editProductStatus(100, true);

console.log(productsList);
