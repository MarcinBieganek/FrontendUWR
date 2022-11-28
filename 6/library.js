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
        if(typeof title !== 'string') {
            throw new Error("Title should be a string!");
        }
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
        if(typeof rating !== 'number') {
            throw new Error("Rating should be a number!");
        }
        if(rating <= 0) {
            throw new Error("Rating should be positive!");
        }
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
        if(typeof title !== 'string') {
            throw new Error("Title should be a string!");
        }
        if(typeof author !== 'string') {
            throw new Error("Author should be a string!");
        }
        if(typeof pages !== 'number') {
            throw new Error("Pages should be a number!");
        }
        if(pages <= 0) {
            throw new Error("Pages should be positive!");
        }
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

//testBook();

class Movie extends Media {
    #director;
    #length;

    constructor({ title, director, length }) {
        if(typeof title !== 'string') {
            throw new Error("Title should be a string!");
        }
        if(typeof director !== 'string') {
            throw new Error("Director should be a string!");
        }
        if(typeof length !== 'number') {
            throw new Error("Length should be a number!");
        }
        if(length <= 0) {
            throw new Error("Lenght should be positive!");
        }
        super({ title });
        this.#director = capitalizeSentence(director);
        this.#length = length;
    }

    get director() {
        return this.#director;
    }

    get length() {
        return this.#length;
    }

    orderMovie() {
        return super.orderMedia();
    }

    returnMovie() {
        return super.returnMedia();
    }
}

async function testMovie() {
    const movie = new Movie({
        title: "alice in wonderland",
        director: 'tim burton',
        length: 108
    })

    console.log(movie.title) // 'Alice In Wonderland'
    console.log(movie.ratings) // []
    console.log(movie.available) // true
    console.log(movie.director) // 'Tim Burton'
    console.log(movie.length) // 108

    movie.addRating(9)
    movie.addRating(8.5)
    console.log(movie.ratings) // [9, 8.5]

    movie.title = "not alice"
    movie.ratings = [1, 1]
    movie.available = false
    movie.director = "Tommy Wiseau"
    movie.length = 500
    console.log(movie.title) // 'Alice In Wonderland'
    console.log(movie.ratings) // [9, 8.5]
    console.log(movie.available) // true
    console.log(movie.director) // 'Tim Burton'
    console.log(movie.length) // 108

    await movie.orderMovie()
    console.log(movie.available) // false

    await movie.returnMovie()
    console.log(movie.available) // true
}

//testMovie();

function testError() {
    //new Media();
    //new Media({ title: 123 });
    //new Book({ title: 123 });
    //new Book({ title: "alice's adventures in wonderland" });
    /*new Book({ 
        title: "alice's adventures in wonderland",
        author: 'Lewis Carroll',
        pages: -10
      });*/
    /*new Book({ 
        title: "alice's adventures in wonderland",
        author: 'Lewis Carroll',
      });*/
    //new Movie({ title: 123 });
    //new Movie({ title: 'Alice in wonderland' });
    /*new Movie({ 
        title: 'Alice in wonderland',
        director: 'tim burton',
        length: -10
      });*/
    /*new Movie({ 
        title: 'Alice in wonderland',
        director: 'tim burton',
      });*/
    /*new Media({ 
        title: 'Alice in wonderland',
      }).addRating(0);*/
    /*new Media({ 
        title: 'Alice in wonderland',
      }).addRating([1,2,3]);*/
}

testError();



const addToLibrary = (props) => {
    let media;
    try {
        switch (props.type) {
            case "book":
                media = new Book(props)
                libraryStore.push(media)
                return media;
            case "movie":
                media = new Movie(props)
                libraryStore.push(media)
                return media;
            default:
                media = new Media(props);
                libraryStore.push(media)
                return media;
        }
    } catch(e) {
        console.log(e.message);
    }
}

function testAdd() {
    const book = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
        pages: 136
    })
    const movie = addToLibrary({
        type: 'movie',
        title: "alice in wonderland",
        director: 'tim burton',
        length: 108
    })
    const media = addToLibrary({
        title: 'Media'
    })

    console.log(libraryStore)
    libraryStore.forEach(element => {
        console.log(element.title);
    });

    const book1 = addToLibrary({
        type: 'book',
        author: 'lewis carroll',
        pages: 136
    }) // Wrong title
    const book2 = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        pages: 136
    }) // Wrong author
    const book3 = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
    }) // Wrong pages
    const book4 = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
        pages: -10
    }) // Wrong pages
    const movie1 = addToLibrary({
        type: 'movie',
        director: 'tim burton',
        length: 108
    }) // Wrong title
    const movie2 = addToLibrary({
        type: 'movie',
        title: "alice in wonderland",
        length: 108
    }) // Wrong director
    const movie3 = addToLibrary({
        type: 'movie',
        title: "alice in wonderland",
        director: 'tim burton',
    }) // Wrong length
    const movie4 = addToLibrary({
        type: 'movie',
        title: "alice in wonderland",
        director: 'tim burton',
        length: -10
    }) // Wrong length
    const media2 = addToLibrary({
        title: 123
    }) // Wrong title
}

//testAdd();

function bulkAddToLibrary(objects) {
    return objects.map(function(elem) {
        return addToLibrary(elem);
    });
}

function testBulk() {
    const [book, movie, media] = bulkAddToLibrary([
        {
            type: 'book',
            title: "alice's adventures in wonderland",
            author: 'lewis carroll',
            pages: 136
        },
        {
            type: 'movie',
            title: "alice in wonderland",
            director: 'tim burton',
            length: 108
        },
        {
            title: 'Media'
        }
    ])

    console.log(libraryStore)
}

//testBulk();



async function order(title) {
    try {
        await libraryStore
            .find((e) => e.title === title)
            .orderMedia();
        
        console.log("Order completed!");
    } catch(e) {
        console.log("Sorry! " + e)
    }
}


async function testOrder() {
    const book = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
        pages: 136
    })

    console.log(book.available) // true
    await order("Alice's Adventures In Wonderland")
    console.log(book.available) // false
    await order("Alice's Adventures In Wonderland") // Sorry! Not available
}

testOrder();