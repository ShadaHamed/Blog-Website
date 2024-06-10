import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    console.log('isAuthenticated from state', isAuthenticated)
    
    useEffect(() => {
        AuthService.initialize();
        // setUser(AuthService.getUser());
        // setToken(AuthService.getToken());
        // setIsAuthenticated(AuthService.getAuthStatus());
        // console.log('isAuthenticated from useEffect', isAuthenticated)
    }, []);

    useEffect(() => {
        const authStatus = AuthService.getAuthStatus();
        setIsAuthenticated(authStatus);
        console.log('isAuthenticated from useEffect2', isAuthenticated)
    }, [AuthService.getAuthStatus()]);

    const login = (user, token) => {
        AuthService.login(user, token);
        setUser(AuthService.getUser());
        setToken(AuthService.getToken())
        setIsAuthenticated(true);
        console.log('user', user, 'token', token, isAuthenticated)
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
