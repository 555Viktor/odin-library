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

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead || false;
}

function showInvalidInputMessage () {
    invalidInputMessage.style.display = 'block';
}

function hideInvalidInputMessage () {
    invalidInputMessage.style.display = 'none';
}

function appendLastBookToDom (booksArr) {

    if (booksArr.length < 0) {
        console.log('Book array is empty');
        return
    }

    let lastBook = booksArr[booksArr.length - 1];
    let tableRow = document.createElement('tr');

    for (let property in lastBook) {
        let tableData = document.createElement('td');

        if (property === 'isRead') {
            
            let readButton = document.createElement('button');
            readButton.innerHTML = 'Read';
            readButton.classList.add('btn-read-status', 'btn-shared-style');
            
            tableData.appendChild(readButton);
        } 
        
        else tableData.innerText = lastBook[property];

        tableRow.appendChild(tableData);
    }

    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete-book', 'btn-shared-style');
    deleteButton.innerText = 'Delete';

    deleteCell.appendChild(deleteButton);
    tableRow.appendChild(deleteCell);

    // After all required cells have been filled and added to the table row, add the table row to table body.
    booksTableBody.appendChild(tableRow);
}

addBookButton.addEventListener('click', () => {
    if (!bookNameInput.value || !bookAuthorInput.value || !bookPagesInput.value || !bookStatusSelect.value) {
        showInvalidInputMessage();
        return;
    } else hideInvalidInputMessage();

    let newBook = new Book (
        bookNameInput.value, 
        bookAuthorInput.value, 
        bookPagesInput.value, 
        bookStatusSelect.value);
    
    myBooks.push(newBook);

    appendLastBookToDom(myBooks);

    // Delete button functionality for each table row
    let deleteButtonsNodeList = document.querySelectorAll('.btn-delete-book');

    deleteButtonsNodeList.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            let currentRow = event.target.closest('tr');
            currentRow.remove();
        })
    })

    // Read button functionality for each table row
    let readButtonsNodeList = document.querySelectorAll('.btn-read-status');

    readButtonsNodeList.forEach(readButton => {
        readButton.addEventListener('click', () => {
            if (readButton.innerText === 'Read')    readButton.innerText = 'Not read';

            else if (readButton.innerText === 'Not read')   readButton.innerText = 'Read'; 
        })
    })

    // Reset input field values to none
    bookNameInput.value = bookAuthorInput.value = bookPagesInput.value = bookStatusSelect.value = '';
})
