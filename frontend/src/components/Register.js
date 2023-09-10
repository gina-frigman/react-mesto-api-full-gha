import { Link } from "react-router-dom";
import Header from "./Header";
import React from "react";

function Register(props) {
    const [formValue, setFormValue] = React.useState({
        email: 'meoooow@ya.ru',
        password: 'vdfv'
    })

    function handleChange(evt) {
        const {name, value} = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(formValue)
    }

    return(
        <div className="page page_auth">
            <Header name='register' isLoggedIn={props.isLoggedIn} />
            <div className='auth'>
                <h2 className="auth__title">Регистрация</h2>
                <form className="auth__form" name='register' onSubmit={handleSubmit}>
                    <label className="auth__field">
                        <input required id='email-input' value={formValue.email}
                        type="email" placeholder="Email" onChange={handleChange}
                        className="auth__input auth__input_type_email" name="email" />
                        <span className="auth__input-error email-input-error"></span>
                    </label>
                    <label className="auth__field">
                        <input required id='password-input' value={formValue.password}
                        type="password" placeholder="Пароль" onChange={handleChange}
                        className="auth__input auth__input_type_password" name="password" />
                        <span className="auth__input-error password-input-error"></span>
                    </label>
                    <button className="auth__submit" type="submit">Зарегистрироваться</button>
                </form>
                <p className='auth__login'>Уже зарегистрированы? <Link to='/sign-in' className='auth__login-link'>Войти</Link></p>
            </div> 
        </div>
    )
}

export default Register;