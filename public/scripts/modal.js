 export default function Modal(){
    const modalWrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector('.button.cancel')
    
    function open(){
        modalWrapper.classList.add("active")
        
    }
    function close(){
        modalWrapper.classList.remove("active")
    }
    
    cancelButton.addEventListener("click", close)

    return {
         open,
         close
     }
 }