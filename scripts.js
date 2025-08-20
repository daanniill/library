let library = []

const color1 = '#0C4160';
const color2 = '#d03b3b';
const color3 = '#28543c';
const color4 = '#9b96cb';
const hover_color = '#738FA7';

function Book(title, author, length, completed, color) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.completed = completed;
    this.color = color;
}

function create_book(new_book){
   // Main book container
    const book = document.createElement("div");
    book.classList.add("book");

    // Cover section
    const cover = document.createElement("div");
    cover.classList.add("cover");

    if (new_book.color.includes("blue")) {
        cover.style.backgroundColor = color1;
    }
    else if (new_book.color.includes("red")) {
        cover.style.backgroundColor = color2;
    }
    else if (new_book.color.includes("green")) {
        cover.style.backgroundColor = color3;
    }
    else {
        cover.style.backgroundColor = color4;
    }

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
    const cover_colors = dialog.querySelector(".cover_colors")
    const colorBtns = cover_colors.querySelectorAll("button");
    let color = "blue"

    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Save selected color
            color = btn.id;
            
            // Remove outline from all buttons
            colorBtns.forEach(b => b.style.outline = "none");

            // Add strong outline to the selected one
            btn.style.outline = `4px solid ${hover_color}`; // you can style it with CSS instead
        });
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default submit
        const formData = new FormData(e.target); 

        console.log(color)
        const book = new Book(
            formData.get('book_title'), 
            formData.get('author'), 
            formData.get('pages'), 
            formData.has('book_complete'),
            color)
        colorBtns.forEach(btn => {
            btn.style.outline = '0';
        })

        library.push(book)
        color = "blue"
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

        const cover_colors = currentBook.querySelector(".cover_colors")
        const colorBtns = cover_colors.querySelectorAll("button");
        let color = ""

        colorBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Save selected color
                color = btn.id;
                
                // Remove outline from all buttons
                colorBtns.forEach(b => b.style.outline = "none");

                // Add strong outline to the selected one
                btn.style.outline = `4px solid ${hover_color}`; // you can style it with CSS instead

                const cover = currentBook.querySelector(".cover");
                cover.classList.add("cover");

                if (color.includes("blue")) {
                    cover.style.backgroundColor = color1;
                }
                else if (color.includes("red")) {
                    cover.style.backgroundColor = color2;
                }
                else if (color.includes("green")) {
                    cover.style.backgroundColor = color3;
                }
                else {
                    cover.style.backgroundColor = color4;
                }

                library[index].color = color;
            });
        });


        deleteBtn.addEventListener("click", () => {
            library.splice(index, 1);
            currentBook.style.animationName = 'fadeAwayTop';
            currentBook.style.animationDuration = '1s';

            currentBook.querySelector(".cover").style.animationName = 'cover'
            currentBook.querySelector(".cover").style.animationDuration = '1s'
            setTimeout(function() {
                currentBook.remove();
            }, 1000);
        });
    })
}

// pre-populate library array
const book1 = new Book(
    "Game of Thrones", 
    "George R.R. Martin", 
    "912", 
    true,
    "blue")

const book2 = new Book(
    "1984", 
    "George Orwell", 
    "250", 
    false,
    "green")

const book3 = new Book(
    "The Eye of the World", 
    "Robert Jordan", 
    "600", 
    true,
    "red")
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