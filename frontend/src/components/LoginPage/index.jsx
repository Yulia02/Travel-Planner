import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        fetch(`${process.env.SERVER_URL}/login`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Access-Control-Allow-Origin" : "*",
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Помилка входу:', response.status);
                return null;
            }
        }).then(data => {
            const {user} = data;
            localStorage.setItem('user', JSON.stringify(user));
            history('/');
        })
    };

    return (
        <div className="container">
            <h2>Увійти</h2>
            <form>
                <div className="label-container">
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="input-container">
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="label-container">
                    <label htmlFor="password">Пароль:</label>
                </div>
                <div className="input-container">
                    <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="button" onClick={handleLogin}>Увійти</button>
            </form>
        </div>
    );
};

export default LoginPage;
