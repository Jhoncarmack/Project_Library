const favDialog = document.getElementById("favDialog");
const confirmBtn = document.getElementById("confirmBtn");
const showDialog = document.getElementById("showDialog");
const cancel = document.querySelector('button[value="cancel"]');
const book_title = document.getElementById("book-title");
const book_author = document.getElementById("book-author");
const book_pages = document.getElementById("book-pages");
const book_read = document.getElementById("book-read");

showDialog.addEventListener("click", () => {
   favDialog.showModal();
});
cancel.addEventListener("click", () => {
   favDialog.close();
});
confirmBtn.addEventListener("click", (event) => {
   event.preventDefault();
   addBookToLibrary(
      book_title.value,
      book_author.value,
      book_pages.value,
      book_read.value,
      crypto.randomUUID(),
   );

   displayBooks();
});

const body = document.querySelector("body");
const container = document.createElement("div");
container.classList.add("book_data");
body.prepend(container);

let myLibrary = [];

function Book(title, author, pages, read, uuid) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
   this.uuid = uuid;
}
function addBookToLibrary(
   add_title,
   add_author,
   add_pages,
   add_read,
   add_uuid,
) {
   const book = new Book(add_title, add_author, add_pages, add_read, add_uuid);
   myLibrary.push(book);
}

Book.prototype.readToggle = function () {
   this.read = !this.read;
};

const displayBooks = function () {
   container.textContent = "";
   myLibrary.forEach((book) => {
      const card = document.createElement("div");
      const bookInfo = document.createElement("div");
      const removeButton = document.createElement("button");
      const readToggleButton = document.createElement("button");
      removeButton.textContent = "삭제";
      readToggleButton.textContent = "읽음 여부 변경";
      card.classList.add("card");
      bookInfo.textContent = `책 제목: ${book.title} | 저자: ${book.author} | 페이지 수: ${book.pages} | 읽은 여부: ${book.read} | 책 고유 ID: ${book.uuid}`;

      card.appendChild(bookInfo);
      card.appendChild(removeButton);
      card.appendChild(readToggleButton);
      container.appendChild(card);

      card.dataset.id = book.uuid;

      removeButton.addEventListener("click", () => {
         const afterLibrary = myLibrary.filter((book) => {
            return book.uuid !== card.dataset.id;
         });
         myLibrary = afterLibrary;
         displayBooks();
      });
      readToggleButton.addEventListener("click", () => {
         book.readToggle();
         displayBooks();
      });
   });
};

addBookToLibrary(
   "생각의 탄생",
   "로버트 루트번스타인",
   456,
   true,
   crypto.randomUUID(),
);

addBookToLibrary("사피엔스", "유발 하라리", 636, false, crypto.randomUUID());

addBookToLibrary(
   "미드나잇 라이브러리",
   "매트 헤이그",
   400,
   true,
   crypto.randomUUID(),
);

displayBooks();
