class Api {
    constructor(props) {
        this._baseUrl = props.baseUrl;
        this._headers = props.headers;
    }

    _checkResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        .then(this._checkResponseData)
    }
    
    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        .then(this._checkResponseData);
    }  

    editProfileInfo(data, token) {
        console.log(data.name, data.about)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponseData);
    }

    editProfileAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponseData);
    }

    addCard(data, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
        .then(this._checkResponseData);
    }

    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then(this._checkResponseData);
    }
    
    changeLikeCardStatus(cardId, isLiked, token) {
        if (isLiked) {
            return this.unlike(cardId, token)
        } else {
            return this.like(cardId, token)
        }
    }

    like(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then(this._checkResponseData);
    }

    unlike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then(this._checkResponseData);
    }
}
export const api = new Api({
    baseUrl: 'https://api.mesto.gina.nomoredomainsrocks.ru'
})