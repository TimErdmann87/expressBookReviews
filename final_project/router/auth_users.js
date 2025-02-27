const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(400).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: {username, password}
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send({message: `User '${username}' successfully logged in`});
    } else {
      return res.status(404).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let book = books[req.params.isbn]
  book.reviews[req.user.data.username] = req.query.review

  return res.status(200).json({message: `The review by user '${req.user.data.username}' for the book with ISBN of '${req.params.isbn}' has been added/updated`, book});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let book = books[req.params.isbn]
    delete book.reviews[req.user.data.username]
  
    return res.status(200).json({message: `Reviews for the book with ISBN of '${req.params.isbn}' posted by user '${req.user.data.username}' deleted`, book});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
