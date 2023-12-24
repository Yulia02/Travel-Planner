import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const RegistrationPage = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        fetch(`${process.env.SERVER_URL}/register`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                name,
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
                console.log('Помилка реєстрації:', response.status);
                return null;
            }
        }).then(data => {
            const {user} = data;
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));
            history('/');
        })

    };


    return (
        <div className="container">
            <h2>Реєстрація</h2>
            <form>
                <div className="input-group">
                    <label>Ім'я:</label>
                    <input type="text" name="name" id="name" required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Пароль:</label>
                    <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="button" onClick={async () => await handleRegistration()}>Зареєструватися</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
