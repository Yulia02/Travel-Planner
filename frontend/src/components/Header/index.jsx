import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setIsAuthenticated(true);
            setName(parsedUser.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setName('');
    };

    const renderAuthenticatedUser = () => {
        return (
            <div className="header-container">
                <span className="greeting">Привіт, {name}!</span>
                <button onClick={handleLogout}>Вийти</button>
            </div>
        );
    };

    const renderUnauthenticatedUser = () => {
        return (
            <div className="header-container">
                <Link to="/login">Увійти</Link>
                <Link to="/registration">Зареєструватися</Link>
            </div>
        );
    };

    return (
        <div style={{ height: '100px' }}>
            {isAuthenticated ? renderAuthenticatedUser() : renderUnauthenticatedUser()}
        </div>
    );
};

export default Header;
