import React from 'react';
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const exitAcc = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className='header'>
            <Link className="link" to="/register">Регистрация</Link>
            <Link className="link" to="/login">Вход</Link>
            <Link className="link" to="/createpost">Создание постов</Link>
            <Link className="link" to="/posts">Просмотр постов</Link>
            {localStorage.length > 0 ? <button onClick={() => exitAcc()}>ВЫХОД</button> : null}
        </div>
    );
};

export default Header;