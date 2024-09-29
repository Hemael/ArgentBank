import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, rememberEmail, forgetEmail } from '../service/authSlice';
import ApiService from '../service/apiService';
import { useNavigate } from 'react-router-dom'; 
import "../main.css";

const SignIn = () => {
    const savedEmail = useSelector((state) => state.auth.email);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Ajout d'un état de chargement
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    useEffect(() => {
        
        if (savedEmail){
            setEmail(savedEmail);
            setRememberMe(true);
        }

    },[savedEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        try {
            const response = await ApiService.login(email, password);
            
            console.log('API Login Data:', response);
    
            if (response.status === 200 && response.body && response.body.token) {
                const { token } = response.body;
    
                // Appel pour obtenir les données utilisateur
                const profileResponse = await ApiService.getProfile(token);
                const user = profileResponse.body; // Assure-toi que c'est correct
                
                console.log('User Data:', user); // Assure-toi que les données utilisateur sont correctes
    
                dispatch(loginSuccess({ user, token }));

                if (rememberMe) {
                    dispatch(rememberEmail(email))
                }
                else {
                    dispatch(forgetEmail())
                }
                navigate('/profile');
            } else {
                throw new Error('Réponse de l\'API invalide');
            }
    
        } catch (err) {
            console.error('Error during login:', err);
            setError('Échec de la connexion, veuillez vérifier vos informations.');
            dispatch(loginFailure());
        } finally {
            setLoading(false); // End loading state
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
                        <input
                         type="checkbox" 
                         id="remember-me" 
                         checked={rememberMe}
                         onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {loading && <p>Loading...</p>} {/* Affiche un message de chargement */}

                    <button type="submit" className="sign-in-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
