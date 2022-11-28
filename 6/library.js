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

    constructor(props) {
        this.#title = capitalizeSentence(props.title);
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

testMedia();
/*

class Book {
    constructor(props) {
        this.title = capitalizeSentence(props.title);
        this.author = capitalizeSentence(props.author);
        this.pages = props.pages;
        this.ratings = [];
        this.available = true;
    }

    orderBook() {
        return new Promise((resolve, reject) => {
            if (this.available) {
                setTimeout(function () {
                    this.available = false;
                    resolve();
                }, 1000)
                return;
            }

            reject("Not available")
        })
    }

    returnBook() {
        return new Promise((resolve, reject) => {
            if (!this.available) {
                setTimeout(function () {
                    this.available = true;
                    resolve();
                }, 1000)
                return;
            }

            reject("Already returned")
        })
    }
}

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