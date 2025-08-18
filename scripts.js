function add_book() {
    const openButton = document.querySelector("#add_book");
    const closeButton = document.querySelector("#close_new");
    const modal = document.querySelector(".book_create")

    openButton.addEventListener("click", () => {
        modal.showModal();
    })

    closeButton.addEventListener("click", () => {
        modal.close();
    })
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
            input.style.color = 'white'
        })
    })
}

btn_anim()
add_book()