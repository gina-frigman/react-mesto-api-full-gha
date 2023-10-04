import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        setTitle('');
        setLink('');
    }, [props.isOpen]);

    function handleTitleInputChange(evt) {
        setTitle(evt.target.value)
    }

    function handleLinkInputChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlaceSubmit({title, link});
    }

    return(
        <PopupWithForm name='post' title='Новое место' 
        isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
        submitText='Создать' submitLoadingText='Добавляем карточку..'
        labels={
          <>
            <label className="popup__field">
                <input required id="title-input" value={title} type="text" name="title"
                className="popup__input popup__input_type_name-place" onChange={handleTitleInputChange}
                placeholder="Название" minLength="2"maxLength="30" />
                <span className="popup__input-error title-input-error"></span>
            </label>
            <label className="popup__field">
                <input required id="url-input" value={link} type="url" name="link" 
                className="popup__input popup__input_type_url" onChange={handleLinkInputChange}
                placeholder="Ссылка на картинку" />
                <span className="popup__input-error url-input-error"></span>
            </label>
          </>} />
    )
}

export default AddPlacePopup;