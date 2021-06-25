import Modal from './modal.js';
const modal = Modal();

//Seleciona elementos da modal
const modalTitle = document.querySelector('.modal h2')//Título
const modalDescription = document.querySelector('.modal p')//Parágrafo
const modalButton = document.querySelector('.modal button')//Botão de confirmação

//Seleciona os botões
const checkButtons = document.querySelectorAll(".actions a.check") //Botãos "Marcar como lida"
const deleteButton = document.querySelectorAll(".actions a.delete") //Botões "Excluir"

function modalToggle(e, check = true) {
    e.preventDefault();
    
    const form = document.querySelector(".modal form");
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = e.target.dataset.id
    const slug = check ? "check" : "delete"
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    
    const text = check ? "Marcar como lida" : "Excluir"
    modalTitle.innerHTML = text
    modalDescription.innerHTML =`Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}

/* Quando o botão "Marcar como lida" for clicado ele abre a modal */
checkButtons.forEach(buttonEl => {
    buttonEl.addEventListener("click", (e) => modalToggle(e, true))
})

/* Quando o botão "Excluir" for clicado ele abre a modal */
deleteButton.forEach(buttonEl => {
    buttonEl.addEventListener("click", (e) => modalToggle(e, false))
})