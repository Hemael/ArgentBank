import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../img/argentBankLogo.png";
import { logout } from '../service/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userData = useSelector(state => state.auth.user); // Récupérer les données utilisateur depuis Redux

    console.log('User Data in Header:', userData); // Log pour vérifier les données utilisateur
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(logout());
    };

    return (
        <nav className="main-nav">
            <NavLink to='/' className="main-nav-logo">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>

            <div>
                {isAuthenticated ? (
                    <>
                        <NavLink to='/profile' className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {userData ? `${userData.firstName} ${userData.lastName}` : 'User'}
                        </NavLink>
                        <button onClick={handleLogout} className="main-nav-item">Sign Out</button>
                    </>
                ) : (
                    <NavLink to='/signin' className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Header;
