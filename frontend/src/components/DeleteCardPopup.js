import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onDeleteCardSubmit(props.card)
    }

    return(
        <PopupWithForm name='delete' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} 
        title='Вы уверены?' submitText='Да' submitLoadingText='Удаление..' labels='' />
    )
};

export default DeleteCardPopup;