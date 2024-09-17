import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../service/apiService';
import "../main.css";
import { updateProfile } from '../service/authSlice';

const Profile = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const token = useSelector((state) => state.auth.token); // Récupère le token depuis Redux

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiService.getProfile(token);
                setUserData(response.body); // Adapte ceci en fonction du format de la réponse API
                setNewFirstName(response.body.firstName); // Initialiser les champs d'édition avec les données existantes
                setNewLastName(response.body.lastName);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors de la récupération des données utilisateur');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setNewFirstName(userData.firstName); // Réinitialiser les champs d'édition
        setNewLastName(userData.lastName);
    };

    const handleSaveClick = async () => {
        try {
            await ApiService.updateProfile(token, { firstName: newFirstName, lastName: newLastName });
            dispatch(updateProfile({firstName: newFirstName, lastName: newLastName}))
            setUserData({ ...userData, firstName: newFirstName, lastName: newLastName });
            setEditing(false);
        } catch (error) {
            setError('Erreur lors de la mise à jour des données utilisateur');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Affiche un message de chargement en attendant les données
    }

    if (error) {
        return <div>{error}</div>; // Affiche l'erreur si elle se produit
    }

    if (!userData) {
        return <div>No user data available</div>; // Affiche un message si aucune donnée n'est disponible
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1>
                {!editing ? (
                    <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                ) : (
                    <>
                        <div className="edit-form">
                            <label htmlFor="first-name"></label>
                            <input 
                                type="text" 
                                id="first-name" 
                                
                                onChange={(e) => setNewFirstName(e.target.value)} 
                                placeholder={userData.firstName} // Affiche l'ancien prénom en grisé
                            />
                            <label htmlFor="last-name"></label>
                            <input 
                                type="text" 
                                id="last-name" 
                                onChange={(e) => setNewLastName(e.target.value)} 
                                placeholder={userData.lastName} // Affiche l'ancien nom en grisé
                            />
                            <div>
                            <button className="save-button" onClick={handleSaveClick}>Save</button>
                            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                            </div>

                        </div>
                    </>
                )}
            </div>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
};

export default Profile;
