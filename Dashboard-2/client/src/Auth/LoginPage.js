import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/login', {
                email,
                password,
            });
            const { token } = res.data;
            localStorage.setItem('token', token);
            window.location.href = '/dashboard';
        } catch (err) {
            alert('Wrong email or password !')
            console.error(err);
        }
    }

    const handleGoogleAuth = async () => {
        try {
            const authUrl = await axios.get("http://localhost:8080/google-url")
            console.log(authUrl)
            window.location.href = authUrl.data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="box">
            <h2>Se connecter</h2><br/>
            <form onSubmit={loginUser} action="/dashboard">
                <p>
                    <label>Pseudo ou email</label><br/><br/>
                    <input type="text" name="first_name" value={email} onChange={(event) => setEmail(event.target.value)} />
                </p>
                <p>
                <br/>
                    <label>Mot de passe</label><br/>
                    <br/>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </p>
                <p>
                <br/>
                <Link to="/dashboard">
                    <button id="sub_btn" type="submit">Se connecter</button>
                </Link>
                </p>
            </form>

            <footer>
            <br/>
            <button id="google-button" onClick={handleGoogleAuth}>
                <span class="google-icon"></span>
                <span class="google-text">Sign in with Google</span>
            </button>
            <br/><br/>
                <p>Première fois ? <Link to="/register">Créer un compte</Link>.</p>
                <br/>
                <p><Link to="/">Retour a la page principal</Link>.</p>
            </footer>
        </div>
    )
}