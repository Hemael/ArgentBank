import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiService from '../service/apiService';
import "../main.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token); // Récupère le token depuis Redux

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiService.getProfile(token);
                setUserData(response.body); // Adapte ceci en fonction du format de la réponse API
                setLoading(false);
            } catch (error) {
                setError('Erreur lors de la récupération des données utilisateur');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

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
                <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1> {/* Affiche le prénom et nom de l'utilisateur */}
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
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
