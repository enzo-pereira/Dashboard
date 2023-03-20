import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Auth.css'

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/register', {
                email,
                password,
            });
            const { token } = res.data;
            console.log(token);
            localStorage.setItem('token', token);
            window.location.href = '/dashboard';
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="box">
            <h2>Créer ton compte</h2><br/>
            <form id='registerForm' onSubmit={registerUser} action='/dashboard'>
                <p>
                <br/>
                    <label>Email </label><br/>
                    <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </p>
                <p>
                <br/>
                    <label>Mot de passe</label><br/>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </p>
                <p>
                <br/>
                    <button id="sub_btn" type="submit">Créer</button>
                </p>
            </form>
            <footer>
            <br/>
                <p>J'ai deja un compte ! <Link to="/login">Je me connecte</Link>.</p><br/>
                <p><Link to="/">Retour a la page principal</Link>.</p>
            </footer>
        </div>
    )

}