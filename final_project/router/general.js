const express = require('express');
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (username.trim().length == 0 ||  password.trim().length == 0) {
      return res.status(400).json({message: "Please provide username/password"});
    }
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(400).json({message: "User already exists!"});    
    }
  } 
  return res.status(400).json({message: "Unable to register user. Please provide username/password."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  const booksByAuthor = []

  Object.keys(books).forEach(isbn => {
    books[isbn].author == author && booksByAuthor.push(
      {
        isbn,
        title: books[isbn].title,
        reviews: books[isbn].reviews
      }
    )
  })

  return res.status(200).json({booksByAuthor: booksByAuthor});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const booksByTitle = []

  Object.keys(books).forEach(isbn => {
    books[isbn].title == title && booksByTitle.push(
      {
        isbn,
        author: books[isbn].author,
        reviews: books[isbn].reviews
      }
    )
  })

  return res.status(200).json({booksByTitle: booksByTitle});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.status(200).json({reviewsByIsbn: books[isbn].reviews});
});

module.exports.general = public_users;
