import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext)

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('')
    
    React.useEffect(() => {
        setName(currentUser.name ?? '')
        setAbout(currentUser.about ?? '');
      }, [currentUser, props.isOpen]);
    
    function handleNameInputChange(evt) {
        setName(evt.target.value);
    }
    function handleDescriptionInputChange(evt) {
      setAbout(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(name, about)
        props.onUpdateUser({
          name, about,
        });
    }

    return(
        <PopupWithForm name='profile' title='Редактировать профиль' 
        isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} 
        submitText='Сохранить' submitLoadingText='Изменяем данные..'
        labels={
          <>
            <label className="popup__field">
                <input required id="name-input" value={name} onChange={handleNameInputChange} 
                type="text" className="popup__input popup__input_type_name" 
                name="name" placeholder="Имя пользователя" minLength="2" maxLength="40" />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input required id="about-input" value={about} onChange={handleDescriptionInputChange}
                 type="text" className="popup__input popup__input_type_about" 
                name="about" placeholder="Статус пользователя" minLength="2" maxLength="200"/>
                <span className="popup__input-error about-input-error"></span>
            </label>
          </>} />
    )
}

export default EditProfilePopup;