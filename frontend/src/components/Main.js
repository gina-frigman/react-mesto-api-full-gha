import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)

    return(
        <>
            <Header name='main' isLoggedIn={props.isLoggedIn} onSignOut={props.onSignOut} userData={props.userData} />
            <main className="main">
                <section className="profile">
                    <div className="profile__user-info">
                        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
                            <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля" />
                        </button>
                        <div className="profile-info">
                            <div className="profile__info">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile-info__about">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="places">
                    {props.cards.map(card => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    ))}
                </section>
            </main>
            <Footer />
        </>
        
    )
};

export default Main;