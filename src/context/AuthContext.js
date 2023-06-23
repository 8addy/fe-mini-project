import React, { createContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await sessionStorage.getItem('user');
            if (user) {
                const userDetails = await JSON.parse(user);
                setUser(userDetails);
                setLoading(false);
            } else setLoading(false);
        }
        fetchUser();
    }, []);
  
    const handleLogin = async (data) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: data.get("email"),
                  password: data.get("password"),
                })
           });
           const body = await response.json();
           if (response.ok) {
                setUser(body);
                sessionStorage.setItem("user", JSON.stringify({ accessToken: body.accessToken, roleId: body.roleId}));
                return true;
           }else {
            return false
           }
          } catch (error) {
            console.log(error);
            return false;
          } finally {
            setLoading(false);
          }
    }

    const handleRegister = async (data) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom_utilisateur: data.get("username"),
                    nom: data.get("name"),
                    prenom: data.get("prenom"),
                    ville: data.get("city"),
                    tel: data.get("phone"),
                    email: data.get("email"),
                    password: data.get("password"),
                })
           });
           if (response.ok) {
                // const body = await response.json();
                // setUser(body);
                // sessionStorage.setItem("user", JSON.stringify({ accessToken: body.accessToken, roleId: body.roleId}));
                return true;
           } else return false;
          } catch (error) {
            console.log(error);
            return false;
          } finally {
            setLoading(false);
          }
    }

    const handleResetPassword = async (data) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/v1/auth/reset-password", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.get("email"),
                    oldPassword: data.get("oldPassword"),
                    newPassword: data.get("newPassword"),
                })
           });
           console.log(response);
           if (response.ok) {
                // const body = await response.json();
                // setUser(body);
                // sessionStorage.setItem("user", JSON.stringify({ accessToken: body.accessToken, roleId: body.roleId}));
                return true;
           } else {
            const body = await response.json();
            console.log('body', body)
            return 
           }
          } catch (error) {
            console.log("catch: ", error);
            return false;
          } finally {
            setLoading(false);
          }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        return;
    }

    return <AuthContext.Provider value={{ user, loadingUser, handleLogin, handleResetPassword, handleRegister, handleLogout }}>{children}</AuthContext.Provider>
}