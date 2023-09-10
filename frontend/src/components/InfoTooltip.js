import successImage from './../images/success.svg';
import failImage from './../images/fail.svg'
import { useNavigate } from 'react-router-dom';

function InfoToolTip(props) {
    const navigate = useNavigate();
    function handleCloseClick() {
        if (props.name === 'success') {
            navigate('/sign-in', {replace: true})
            props.onClose();
        } else {
            props.onClose();
        }
    }
    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container_type_info'>
                <button className={`popup__close`} type="button" onClick={handleCloseClick}></button>
                <img src={props.name === 'success' ? successImage : failImage} className="popup__sign" 
                alt={props.name === 'success' ? 'успешная регистрация' : 'ошибка в регистрации'} />
                <h2 className="popup__title popup__title_type_info">{props.name === 'success' ? 
                'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
};

export default InfoToolTip;