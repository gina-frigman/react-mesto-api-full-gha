import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button className={`popup__close popup__close_${props.name}`} type="button" onClick={props.onClose}></button>
                <form className={`popup__form popup__form_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
                    <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
                    {props.labels}
                    <button className={`popup__submit popup__submit_${props.name}`} type="submit">{props.submitText}</button>
                    <button className="popup__submit-loading" type="submit">{props.submitLoadingText}..</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;