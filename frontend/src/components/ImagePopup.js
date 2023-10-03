import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup_place ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_place">
                <button className="popup__close popup__close_place" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card && card.link} alt={card && card.name} />
                <h2 className="popup__name">{card && card.name}</h2>
            </div>
        </div>
    );
};

export default ImagePopup;