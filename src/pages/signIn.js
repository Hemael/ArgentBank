import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../service/authSlice'; // Assure-toi que ces actions existent
import ApiService from '../service/apiService';
import { useNavigate } from 'react-router-dom'; // Pour la navigation

import "../main.css";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Pour rediriger après connexion


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await ApiService.login(email, password);
        
        if (response.status === 200 && response.body && response.body.token) {
            const { token, user } = response.body; // Assure-toi que `user` contient les données utilisateur
            
            console.log('User Data:', user); // Log pour vérifier les données utilisateur

            // Dispatch l'action loginSuccess avec les données utilisateur
            dispatch(loginSuccess({ user, token }));

            // Optionnel : stocke le token dans le localStorage
            localStorage.setItem('authToken', token);

            // Redirige vers la page de profil
            navigate('/profile');
        } else {
            throw new Error('Réponse de l\'API invalide');
        }

    } catch (err) {
        setError('Échec de la connexion, veuillez vérifier vos informations.');
        dispatch(loginFailure());
    }
};


    
    

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
