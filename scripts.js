function add_book() {
    const openButton = document.querySelector("#add_book");
    const closeButton = document.querySelector("#close_new");
    const modal = document.querySelector(".new_book")

    openButton.addEventListener("click", () => {
        modal.showModal();
    })

    closeButton.addEventListener("click", () => {
        modal.close();
    })
}

add_book()