import React from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
    const avatarRef = React.useRef({})

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return(
        <PopupWithForm name='avatar' title='Обновить аватар' 
        isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
        submitText='Сохранить' submitLoadingText='Обновляем ваш аватар..'
        labels={
          <>
            <label className="popup__field">
                <input required id="avatar-input" ref={avatarRef} type="url" 
                className="popup__input popup__input_type_avatar" 
                name="link" placeholder="Ссылка на картинку" />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
          </>} />)
}

export default EditAvatarPopup;