// DOM Elements
const bookNameInput = document.querySelector('.input-field #input-book-name');
const bookAuthorInput = document.querySelector('.input-field #input-author');
const bookPagesInput = document.querySelector('.input-field #input-pages');
const bookStatusSelect = document.querySelector('.input-field #input-read-status');
const invalidInputMessage = document.querySelector('.warning-message');

const addBookButton = document.querySelector('.btn-add-book');
const readStatusButton = document.querySelector('.btn-read-status');
const deleteBookButton = document.querySelector('.btn-delete-book');

const booksTableBody = document.querySelector('.book-list-table .all-books-list');

let myBooks = [];

// Book constructer function
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead || false;
}

// Helper functions
// ------------------------------------
function showInvalidInputMessage () {
    invalidInputMessage.style.display = 'block';
}

function hideInvalidInputMessage () {
    invalidInputMessage.style.display = 'none';
}

function isUserInputValid() {
    return bookNameInput.value && bookAuthorInput.value && bookPagesInput.value && bookStatusSelect.value;
}

function resetInputFieldValues () {
    bookNameInput.value = bookAuthorInput.value = bookPagesInput.value = bookStatusSelect.value = '';
}

function createBookDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete-book', 'btn-shared-style');
    deleteButton.innerText = 'Delete';
    
    addDeleteButtonEvent(deleteButton);
    
    return deleteButton;
}

function addDeleteButtonEvent(deleteBtn) {
    deleteBtn.addEventListener('click', (event) => {
        let currentRow = event.target.closest('tr');
        currentRow.remove();
    })
}

function createBookReadStatusButton() {	
    let readButton = document.createElement('button');
    
    readButton.innerHTML = bookStatusSelect.value;
    
    readButton.classList.add('btn-read-status', 'btn-shared-style');
    
    addReadButtonEvent (readButton)

    return readButton;
}

function addReadButtonEvent (readBtn) {
    readBtn.addEventListener('click', () => {
        readBtn.innerText = readBtn.innerText === 'Read' ? 'Not read' : 'Read';
    })
}
// ------------------------------------


function appendLastBookToDom (booksArr) {
    if (booksArr.length < 0) {
        console.log('Book array is empty.');
        return
    }

    let lastBook = booksArr[booksArr.length - 1];
    let tableRow = document.createElement('tr');

    for (let property in lastBook) {
        let tableData = document.createElement('td');

        if (property === 'isRead') tableData.appendChild(createBookReadStatusButton());
        else tableData.innerText = lastBook[property];

        tableRow.appendChild(tableData);
    }

    let deleteCell = document.createElement('td');
    deleteCell.appendChild(createBookDeleteButton());
    tableRow.appendChild(deleteCell);

    // After all required cells have been filled and added to the table row, add the table row to table body.
    booksTableBody.appendChild(tableRow);
}

// Event
addBookButton.addEventListener('click', () => {
    if (!isUserInputValid()) {
        showInvalidInputMessage();
        return;
    } else hideInvalidInputMessage();

    let newBook = new Book (
        bookNameInput.value, 
        bookAuthorInput.value, 
        bookPagesInput.value, 
        bookStatusSelect.value
    );
    
    myBooks.push(newBook);

    appendLastBookToDom(myBooks);
    resetInputFieldValues();
})
