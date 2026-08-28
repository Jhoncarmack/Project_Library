const myLibrary = [];

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
console.log(myLibrary);
