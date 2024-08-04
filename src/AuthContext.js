import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        AuthService.initialize();
    }, []);

    useEffect(() => {
        const authStatus = AuthService.getAuthStatus();
        setIsAuthenticated(authStatus);
    }, [AuthService.getAuthStatus()]);

    const login = (user, token) => {
        AuthService.login(user, token);
        setUser(AuthService.getUser());
        setToken(AuthService.getToken())
        setIsAuthenticated(true);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
