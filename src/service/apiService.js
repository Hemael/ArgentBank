const BASE_URL = 'http://localhost:3001/api/v1';

const ApiService = {
    // Connexion de l'utilisateur
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });


        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }

        return response.json();
    },

    // Inscription d'un nouvel utilisateur
    signup: async (userData) => {
        const response = await fetch(`${BASE_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Échec de l\'inscription');
        }

        return response.json();
    },

    // Récupération du profil de l'utilisateur connecté
    getProfile: async (token) => {
        const response = await fetch(`${BASE_URL}/user/profile`, {
            method: 'POST',  // Selon ta doc, c'est un POST ici, pas un GET.
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Impossible de récupérer le profil');
        }

        return response.json();
    },

    // Mise à jour du profil utilisateur
    updateProfile: async (token, profileData) => {
        const response = await fetch(`${BASE_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Échec de la mise à jour du profil');
        }

        return response.json();
    }
};

export default ApiService;
