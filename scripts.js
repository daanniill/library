let library = []

function Book(title, author, length, completed) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.completed = completed;
}

function create_book(new_book){
   // Main book container
    const book = document.createElement("div");
    book.classList.add("book");

    // Cover section
    const cover = document.createElement("div");
    cover.classList.add("cover");

    const coverContent = document.createElement("div");
    coverContent.classList.add("cover_content");

    const coverTitle = document.createElement("div");
    coverTitle.id = "title";
    coverTitle.textContent = new_book.title;

    const coverAuthor = document.createElement("div");
    coverAuthor.id = "author";
    coverAuthor.textContent = `By ${new_book.author}`;

    coverContent.appendChild(coverTitle);
    coverContent.appendChild(coverAuthor);
    cover.appendChild(coverContent);

    // Content section
    const content = document.createElement("div");
    content.classList.add("content");

    // Cover color buttons
    const coverColors = document.createElement("div");
    coverColors.classList.add("cover_colors");

    ["blue", "red", "green", "purple"].forEach(color => {
        const btn = document.createElement("button");
        btn.id = color;
        coverColors.appendChild(btn);
    });

    const contentTitle = document.createElement("div");
    contentTitle.id = "title";
    contentTitle.textContent = new_book.title;

    const contentAuthor = document.createElement("div");
    contentAuthor.id = "author";
    contentAuthor.textContent = `By ${new_book.author}`;

    const contentLength = document.createElement("div");
    contentLength.id = "length";
    contentLength.textContent = `Length: ${new_book.length} pages`;

    const contentStatus = document.createElement("div");
    contentStatus.id = "read_status";
    contentStatus.textContent = new_book.completed 
        ? "Read Status: Completed" 
        : "Read Status: Not Completed";

    // Book functions
    const bookFunctions = document.createElement("div");
    bookFunctions.classList.add("book_functions");

    const completeBtn = document.createElement("button");
    completeBtn.id = "completion";
    completeBtn.textContent = new_book.completed ? "In-Progress" : "Completed";

    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.textContent = "Delete";

    bookFunctions.appendChild(completeBtn);
    bookFunctions.appendChild(deleteBtn);

    // Assemble content
    content.appendChild(coverColors);
    content.appendChild(contentTitle);
    content.appendChild(contentAuthor);
    content.appendChild(contentLength);
    content.appendChild(contentStatus);
    content.appendChild(bookFunctions);

    // Assemble book
    book.appendChild(cover);
    book.appendChild(content);

    // Append to bookshelf
    const bookShelf = document.querySelector(".book_shelf");
    bookShelf.appendChild(book);
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
        library.push(book)
        update_library()
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

function update_library() {
    document.querySelector('.book_shelf').innerHTML = '';
    
    library.forEach((book, index) => {
        create_book(book);

        const currentBook = document.querySelectorAll(".book")[index];
        const completionBtn = currentBook.querySelector("#completion");
        const deleteBtn = currentBook.querySelector("#delete");
        const readStatus = currentBook.querySelector("#read_status");

        completionBtn.addEventListener("click", () => {
            if (readStatus.textContent.includes("Not")) {
                readStatus.textContent = "Read Status: Completed";
                completionBtn.textContent = "In-Progress"; 
            } else {
                readStatus.textContent = "Read Status: Not Completed";
                completionBtn.textContent = "Completed";
            }
            library[index].completed = !library[index].completed;
        });

        deleteBtn.addEventListener("click", () => {
            library.splice(index, 1);
            currentBook.remove();
        });
    })
}

// pre-populate library array
const book1 = new Book(
    "Game of Thrones", 
    "George R.R. Martin", 
    "912", 
    true)

const book2 = new Book(
    "1984", 
    "George Orwell", 
    "250", 
    false)

const book3 = new Book(
    "The Eye of the World", 
    "Robert Jordan", 
    "600", 
    true)
library.push(book1)
library.push(book2)
library.push(book3)

update_library()
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