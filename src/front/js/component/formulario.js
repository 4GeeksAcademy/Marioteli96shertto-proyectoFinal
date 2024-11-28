import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ email: '', password: '' });
    const navigate = useNavigate()

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', loginData);
        // Lógica para manejar el inicio de sesión
        fetch(process.env.BACKEND_URL + "/api/login",
            {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: { "Content-Type": "application/json" }

            })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    navigate("/privada")
                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                localStorage.setItem("token", data.access_token)


            })

    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log('Signing up with:', signupData);
        // Lógica para manejar el registro
        fetch(process.env.BACKEND_URL + "/api/registre",
            {
                method: "POST",
                body: JSON.stringify(signupData),
                headers: { "Content-Type": "application/json" }

            })
            .then((response) => {
                console.log(response);

                return response.json()
            })
            .then(data => {
                console.log(data);


            })
    };


    return (
        <div>
            {/* Formulario de Log In */}
            <form onSubmit={handleLoginSubmit} style={{ marginBottom: '20px' }}>
                <h3>Log In</h3>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
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
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
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
                    }}
                />

                <button style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}>Log In</button>
            </form>

            {/* Formulario de Sign Up */}
            <form onSubmit={handleSignupSubmit}>
                <h3>Sign Up</h3>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
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
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
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
                    }}
                />


                <button style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}>Sign Up</button>
            </form>
        </div>
    );
}

export default AuthForm;
