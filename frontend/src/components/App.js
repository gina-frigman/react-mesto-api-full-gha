import React from "react";
import { auth } from './../utils/Auth'
import Main from "./Main.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import Login from "./Login.js";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false)
  const [cards, setCards] = React.useState([])
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [card, setCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [infoToolTipState, setInfoToolTipState] = React.useState('')
  
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo(localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err))
    } 
  }, [isLoggedIn])

  React.useEffect(() => {
    if(isLoggedIn) {
      api.getInitialCards(localStorage.jwt)
      .then(res => {
          setCards(res)
          console.log(localStorage.jwt)
      })
      .catch(err => console.log(err));
    } 
  }, [isLoggedIn])

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth.getContent(jwt)
      .then((res) => {
        if (res) {
          const userData = {
            email: res.email
          }
          setIsLoggedIn(true);
          setUserData(userData);
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err))
    }
  }, [navigate])

  function handleRegister(formValue) {
    auth.register(formValue)
    .then((res) => {
        if (res) {
            setIsInfoToolTipOpen(true);
            setInfoToolTipState('success')
        }
    })
    .catch(err => {
        console.log(err);
        setIsInfoToolTipOpen(true);
        setInfoToolTipState('fail')
    })
  }

  function handleLogin(formValue) {
    auth.authorize(formValue)
    .then(() => {
        setIsLoggedIn(true)
        navigate('/', {replace: true});
    })
    .catch((err) => {
        console.log(err);
        setIsInfoToolTipOpen(true);
        setInfoToolTipState('fail')
    })
  };
  
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
    navigate('/sign-in', {replace: true});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id)
    api.changeLikeCardStatus(card._id, isLiked, localStorage.jwt)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  };

  function handleDeleteCardSubmit(card) {
    api.deleteCard(card._id, localStorage.jwt)
    .then(() => {
      const newCards = cards.filter(cardItem => cardItem._id !== card._id)
      setCards(newCards)
    })
    .then(() => {
      closeAllPopups();
    })
    .catch(err => console.log(err));
  };

  function handleUpdateUser(data) {
    console.log(data)
    api.editProfileInfo(data, localStorage.jwt)
    .then(res => {
      console.log(res)
      setCurrentUser({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        _id: res._id
      })
    })
    .then(() => {
      closeAllPopups();
    })
    .catch(err => console.log(err));
  };

  function handleUpdateAvatar(data) {
    api.editProfileAvatar(data, localStorage.jwt)
    .then(res => {
      setCurrentUser({
        name: res.name,
        about: res.about,
        avatar: res.avatar
      })
    })
    .then(() => {
      closeAllPopups();
    })
    .catch(err => console.log(err));
  };

  function handleAddPlaceSubmit(data) {
    api.addCard(data, localStorage.jwt)
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
    .then(() => {
      closeAllPopups();
    })
    .catch(err => console.log(err));
  };
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCard(card)
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoToolTipOpen(false)
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='*' element={<Navigate to='/sign-in' replace />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} setUserData={setUserData} />} />
          <Route path="/sign-up" element={<Register setInfoToolTipState={setInfoToolTipState} setIsInfoToolTipOpen={setIsInfoToolTipOpen} onRegister={handleRegister} />} />
          <Route path="/" element={<ProtectedRoute element={Main} cards={cards} onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onSignOut={handleSignOut}
        onCardLike={handleCardLike} onCardDelete={handleDeleteCardClick} isLoggedIn={isLoggedIn} userData={userData} />} />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCardSubmit={handleDeleteCardSubmit} card={card} />
        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} name={infoToolTipState} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
