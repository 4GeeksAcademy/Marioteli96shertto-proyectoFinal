import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Privada = () => {
    useEffect(() => {
        const validate = () => {
            const token = localStorage.getItem("token")
            fetch("https://sturdy-guide-97qj665ppq4rh79ww-3001.app.github.dev/api/protected", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log(error))
            
        }
        validate()

    }, [])
        const navigate = useNavigate();
    
        const handleSignOut = () => {
            // Lógica para cerrar sesión
            localStorage.removeItem("authToken"); // Ejemplo: eliminar token de autenticación
            navigate("/"); // Redirigir al login después de cerrar sesión
        };
    
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <h1 style={{ marginBottom: "20px" }}>Bienvenido a tu perfil privado</h1>
                <button
                    onClick={handleSignOut}
                    style={{
                        width: "100%",
                        maxWidth: "200px",
                        padding: "10px 15px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        outline: "none",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Sign Out
                </button>
            </div>
        );
    };
