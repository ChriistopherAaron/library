// 1. Array storage for books
const myLibrary = [];

// 2. Book Constructor Function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// 3. Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// 4. Function to add book instance to library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// 5. Function to render books from array to DOM
function displayBooks() {
  const container = document.getElementById("library-container");
  container.innerHTML = ""; // Clear existing cards

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-index", index);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not read yet"}</p>
      <div class="card-buttons">
        <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">Toggle Read</button>
        <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// 6. Remove book handler
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// 7. Toggle read status handler
function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

// 8. Dialog & Form Event Listeners
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  dialog.close();
});

// Add starter sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);