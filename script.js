const favDialog = document.getElementById("favDialog");
const cancelDialog = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");
const showDialog = document.getElementById("showDialog");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookRead = document.getElementById("book-read");
const bookPages = document.getElementById("book-pages");

const bookView = document.querySelector(".book-list");

let myLibrary = [];

showDialog.addEventListener("click", () => {
   favDialog.showModal();
});
cancelDialog.addEventListener("click", () => {
   favDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
   event.preventDefault();
   addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookRead.value,
      bookPages.value,
      crypto.randomUUID(),
   );
   displayBooks();
});
function Book(title, author, read, pages, uuid) {
   this.title = title;
   this.author = author;
   this.read = read;
   this.pages = pages;
   this.uuid = uuid;
}
Book.prototype.readToggle = function () {
   this.read = !this.read;
};
function addBookToLibrary(
   bookTitle,
   bookAuthor,
   bookRead,
   bookPages,
   bookUuid,
) {
   const addBook = new Book(
      bookTitle,
      bookAuthor,
      bookRead,
      bookPages,
      bookUuid,
   );
   myLibrary.push(addBook);
}

addBookToLibrary(
   "달빛 도서관의 비밀",
   "김민서",
   true,
   320,
   crypto.randomUUID(),
);
addBookToLibrary(
   "AI 시대의 생존 전략",
   "David Park",
   false,
   440,
   crypto.randomUUID(),
);
addBookToLibrary(
   "방구석 세계 여행 가이드",
   "이한결",
   true,
   246,
   crypto.randomUUID(),
);

const displayBooks = function () {
   bookView.textContent = "";
   myLibrary.forEach((book) => {
      const info = document.createElement("div");

      info.classList.add("book-info");
      const removeButton = document.createElement("button");
      removeButton.textContent = "삭제";
      const readToggleButton = document.createElement("button");
      readToggleButton.textContent = "읽기 여부 변경";
      const card = document.createElement("div");
      card.appendChild(info);
      card.appendChild(removeButton);
      card.appendChild(readToggleButton);
      card.classList.add("book-card");
      info.dataset.id = book.uuid;

      info.textContent = `${book.title} ${book.author} ${book.read} ${book.pages} ${book.uuid}`;
      bookView.appendChild(card);
      removeButton.addEventListener("click", () => {
         const afterRemove = myLibrary.filter((book) => {
            return info.dataset.id !== book.uuid;
         });
         myLibrary = afterRemove;
         displayBooks();
      });
      readToggleButton.addEventListener("click", () => {
         book.readToggle();
         displayBooks();
      });
   });
};

displayBooks();
