import React from 'react';
import Header from './Header';

function Login(props) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
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
        props.onLogin(formValue);
    }

    return(
        <div className='page page_auth'>
            <Header name='login' isLoggedIn={props.isLoggedIn} />
            <div className='auth'>
                <h2 className="auth__title">Вход</h2>
                <form className="auth__form" name='login' onSubmit={handleSubmit}>
                    <label className="auth__field">
                        <input required id='email-input' value={formValue.email}
                        type="email" placeholder="Email" name="email" onChange={handleChange}
                        className="auth__input auth__input_type_email" />
                        <span className="auth__input-error email-input-error"></span>
                    </label>
                    <label className="auth__field">
                        <input required id='password-input' value={formValue.password} 
                        type="password" placeholder="Пароль" name="password" onChange={handleChange}
                        className="auth__input auth__input_type_password" />
                        <span className="auth__input-error password-input-error"></span>
                    </label>
                    <button className="auth__submit" type="submit">Войти</button>
                </form>
            </div> 
        </div>
    )
}

export default Login;