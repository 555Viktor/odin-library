// DOM Elements
const bookNameInput = document.querySelector('.input-field #input-book-name');
const bookAuthorInput = document.querySelector('.input-field #input-author');
const bookPagesInput = document.querySelector('.input-field #input-pages');
const bookStatusSelect = document.querySelector('.input-field #input-read-status');

const addBookButton = document.querySelector('.btn-add-book');
const readStatusButton = document.querySelector('.btn-read-status');
const deleteBookButton = document.querySelector('.btn-delete-book');

let myBooks = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead || false;
}

addBookButton.addEventListener('click', () => {
    let newBook = new Book(bookNameInput.value, bookAuthorInput.value, bookPagesInput.value, bookStatusSelect.value);
    
    myBooks.push(newBook);
})