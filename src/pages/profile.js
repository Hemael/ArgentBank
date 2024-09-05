import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiService from '../service/apiService';
import "../main.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const token = useSelector((state) => state.auth.token); // Récupère le token depuis Redux

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiService.getProfile(token);
                setUserData(response.body); // Adapte ceci en fonction du format de la réponse API

            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
            }
        };

        fetchUserData();
    }, [token]);

    if (!userData) {
        return <div>Loading...</div>; // Affiche un message de chargement en attendant les données
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
