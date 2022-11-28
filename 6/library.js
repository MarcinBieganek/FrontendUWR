const libraryStore = [];

String.prototype.capitalize = function() {
    return this.length === 0 ? '' : this[0].toUpperCase() + this.slice(1)
}

function capitalize(string) {
    return string.length === 0 ? '' : string[0].toUpperCase() + string.slice(1)
}

function capitalizeSentence(sentence) {
    return sentence
        .split(' ')
        .map(function(word) {
            return capitalize(word);
        })
        .join(' ');
}

console.log(capitalize('alice')) // 'Alice'
console.log(capitalize('')) // ''

console.log('alice'.capitalize()) // 'Alice'
console.log(''.capitalize()) // ''

console.log(capitalizeSentence('alice')) // 'Alice'
console.log(capitalizeSentence('alice in Wonderland')) // 'Alice In Wonderland'


class Media {
    #title;
    #ratings;
    #available;

    constructor({ title }) {
        this.#title = capitalizeSentence(title);
        this.#ratings = [];
        this.#available = true;
    }

    get title() {
        return this.#title;
    }

    get ratings() {
        return this.#ratings;
    }

    get available() {
        return this.#available;
    }

    addRating(rating) {
        this.#ratings.push(rating);
    }

    orderMedia() {
        let m = this;
        return new Promise((resolve, reject) => {
            if (m.#available) {
                setTimeout(function () {
                    m.#available = false;
                    resolve();
                }, 1000)
                return;
            }

            reject("Not available")
        })
    }

    returnMedia() {
        let m = this;
        return new Promise((resolve, reject) => {
            if (!m.#available) {
                setTimeout(function () {
                    m.#available = true;
                    resolve();
                }, 1000)
                return;
            }

            reject("Already returned")
        })
    }
}

const media = new Media({title: 'alice in wonderland'})
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // []
console.log(media.available) // true

media.addRating(9)
media.addRating(8.5)
console.log(media.ratings) // [9, 8.5]

media.title = "not alice"
media.ratings = [1, 1]
media.available = false
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // [9, 8.5]
console.log(media.available) // true

async function testMedia() {
    const media = new Media({title: 'alice in wonderland'})

    await media.orderMedia()
    console.log(media.available) // false
    
    await media.returnMedia()
    console.log(media.available) // true
}

//testMedia();


class Book extends Media {
    #author;
    #pages;

    constructor({ title, author, pages }) {
        super({ title });
        this.#author = capitalizeSentence(author);
        this.#pages = pages;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    orderBook() {
        return super.orderMedia();
    }

    returnBook() {
        return super.returnMedia();
    }
}

async function testBook() {
    console.log("Test book =================");
    const book = new Book({
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
        pages: 136
    })

    console.log(book.title) // "Alice's Adventures In Wonderland"
    console.log(book.ratings) // []
    console.log(book.available) // true
    console.log(book.author) // 'Lewis Carroll'
    console.log(book.pages) // 136

    book.addRating(9)
    book.addRating(8.5)
    console.log(book.ratings) // [9, 8.5]

    book.title = "not alice"
    book.ratings = [1, 1]
    book.available = false
    book.author = "Charles Dickens"
    book.pages = 500
    console.log(book.title) // "Alice's Adventures In Wonderland"
    console.log(book.ratings) // [9, 8.5]
    console.log(book.available) // true
    console.log(book.author) // 'Lewis Carroll'
    console.log(book.pages) // 136

    await book.orderBook()
    console.log(book.available) // false

    await book.returnBook()
    console.log(book.available) // true
}

testBook();

/*

const addToLibrary = (props) => {
    switch (props.type) {
        case "book":
            const media = new Book(props)
            libraryStore.push(media)
            return media;
        case "movie":
            const media = new Movie(props)
            libraryStore.push(media)
            return media;
        default:
            const media = new Media(props);
            libraryStore.push(media)
            return media;
    }
}

function order(title) {
    for (let i = 0; i < libraryStore.length; i++) {
        if (libraryStore[i].title === title) {
            libraryStore[i].orderMedia().then(
                console.log("Order completed!")
            ).catch((e) => {
                console.log("Sorry! " + e)
            })
        }
    }
}
*/