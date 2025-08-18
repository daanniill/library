function Book(title, author, length) {
    this.title = title;
    this.author = author;
    this.length = length;
}

function create_book(new_book){
    // Select the first book
    const bookShelf = document.querySelector(".book_shelf");
    const firstBook = document.querySelector(".book");

    // Clone the book (deep copy = true so children are copied too)
    const newBook = firstBook.cloneNode(true);

    // Update the fields inside the cloned book
    newBook.querySelectorAll("#title")[0].textContent = new_book.title;
    newBook.querySelectorAll("#title")[1].textContent = new_book.title;
    newBook.querySelectorAll("#author")[0].textContent = `By ${new_book.author}`;
    newBook.querySelectorAll("#author")[1].textContent = `By ${new_book.author}`;
    newBook.querySelector("#length").textContent = `Length: ${new_book.length} pages`;
    newBook.querySelector("#read_status").textContent = "Read Status: Not Started";

    // Append the new book to the shelf
    bookShelf.appendChild(newBook);
}

function gather_book_data() {
    const form = document.querySelector(".new_book")
    const dialog = document.querySelector("dialog");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default submit
        const formData = new FormData(e.target); 
        const book = new Book(formData.get('book_title'), formData.get('author'), formData.get('pages'))
        create_book(book)
        dialog.close(); // closes the modal
        form.reset();
    });
}


function btn_anim() {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        const label = input.previousElementSibling
        input.addEventListener('focus', () => {
            label.style.transform = 'translateX(0) translateY(0)'
            label.style.fontSize = '16px';
            input.style.color = '#040404'
            label.style.transition = '0.2s'
        })
        input.addEventListener('blur', () => {
            // Only move back if input is empty
            if (input.value.trim() === '') {
                label.style.transform = 'translateX(10px) translateY(28px)';
                label.style.fontSize = '16px';
                label.style.transition = '0.2s'
            }
        })
    })
}

gather_book_data()
btn_anim()

const openButton = document.querySelector("#add_book");
const closeButton = document.querySelector("#close_new");
const modal = document.querySelector("dialog")

openButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    modal.close();
})