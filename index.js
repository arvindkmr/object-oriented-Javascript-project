// books class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const StoredBooks = [
      { title: "a", author: "a1", isbn: "1" },
      { title: "b", author: "b2", isbn: "2" },
    ];

    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href=# class="btn btn-danger btn-sm delete"> X</a></td>
      `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    const child = document.createTextNode(message);
    div.appendChild(child);
    container.insertBefore(div, form);

    //timeout function to remove alert
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

//UI class : handle UI tasks

//store Class : store data of the UI and Local storage

//Events class : Display books => add books , delete books And Ui and local storage

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // preventing the default action
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const book = new Book(title, author, isbn);

  //add book to the list
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert(" fill all the details", "danger");
  } else {
    UI.addBookToList(book);
  }

  //show alert for book added
  UI.showAlert("Book Added", "success")
  
  //clear form for next input
  document.getElementById("book-form").reset();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  // handle the delete functionality
  UI.deleteBook(e.target);
  
  //show remove alert
  UI.showAlert("Book Removed", "info")
});
