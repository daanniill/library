function Book(title, author, length, completed) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.completed = completed;
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
    if (new_book.completed) {
        newBook.querySelector("#read_status").textContent = "Read Status: Completed";
    }
    else {
        newBook.querySelector("#read_status").textContent = "Read Status: Not Completed";
    }

    book_functions()
    // Append the new book to the shelf
    bookShelf.appendChild(newBook);
}

function gather_book_data() {
    const form = document.querySelector(".new_book")
    const dialog = document.querySelector("dialog");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default submit
        const formData = new FormData(e.target); 
        const book = new Book(
            formData.get('book_title'), 
            formData.get('author'), 
            formData.get('pages'), 
            formData.has('book_complete'))
        create_book(book)
        form.reset();
        dialog.close(); // closes the modal
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
            if (input.value.length === 0 && input.id != "pages") {
                label.style.transform = 'translateX(10px) translateY(28px)';
                label.style.fontSize = '16px';
                label.style.transition = '0.2s'
            }
        })
    })
}

function book_functions() {
    const books = document.querySelectorAll(".book")

    books.forEach(book => {
        // Rebind button actions for this specific new book
        const completionBtn = book.querySelector("#completion");
        const deleteBtn = book.querySelector("#delete");
        const readStatus = book.querySelector("#read_status");

        completionBtn.addEventListener("click", () => {
            if (readStatus.textContent.includes("Not")) {
                readStatus.textContent = "Read Status: Completed";
                completionBtn.textContent = "In-Progress";
            } else {
                readStatus.textContent = "Read Status: Not Completed";
                completionBtn.textContent = "Completed";
            }
        });

        deleteBtn.addEventListener("click", () => {
            book.remove();
        });
    })
}

book_functions()
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