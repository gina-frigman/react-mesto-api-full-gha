import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const handleClick = () => {
        props.onCardClick(props.card)
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card)
    }

    const handleDeleteClick = () => {
        props.onCardDelete(props.card)
    }    

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id
    const isLiked = props.card.likes.some(like => like === currentUser._id)

    return(
        <article className="place">
            {isOwn && <button className="place__delete" type="button" onClick={handleDeleteClick}></button>}
            <img className="place__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="place__info">
                <h2 className="place__name">{props.card.name}</h2>
                <div className="place__likes">
                    <button className={`place__like ${isLiked ? 'place__like_active' : ''}`} type="button" onClick={handleLikeClick}></button>
                    <p className="place__likes-amount">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;