import AuthService from './AuthService';

const fetchWithAuth = async (url, options = {}) => {
    const token = AuthService.getToken();
    const headers = options.headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};

export default fetchWithAuth;
