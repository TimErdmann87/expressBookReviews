const axios = require('axios');

const baseUrl = "https://prox87-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/"

const getAllBooks = async(url)=>{
    const res = await axios.get(url);
    const books = res.data.books;
    console.log("\nList of books:")
    console.log(books)
}

const getBookByIsbn = async(url, isbn)=>{
    const res = await axios.get(url + "/isbn/" + isbn.toString());
    const book = res.data;
    console.log(`\nGet book detail by ISBN '${isbn}':`)
    console.log(book)
}

const getBookByAuthor = async(url, author)=>{
    const res = await axios.get(url + "/author/" + author);
    const book = res.data;
    console.log(`\nGet book detail by author '${author}':`)
    console.log(book)
}

const getBookByTitle = async(url, title)=>{
    const res = await axios.get(url + "/title/" + title);
    const book = res.data;
    console.log(`\nGet book detail by title '${title}':`)
    console.log(book)
}




getAllBooks(baseUrl);

getBookByIsbn(baseUrl, 2);

getBookByAuthor(baseUrl, "Dante Alighieri");

getBookByTitle(baseUrl, "Fairy tales")

