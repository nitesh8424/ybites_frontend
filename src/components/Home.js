import React from "react";
import { useNavigate } from "react-router-dom";

const Home =()=>{
    const navigate = useNavigate();
    const handleLogin=(e)=>{
        navigate('/login')
    }
    const handleRegister=()=>{
        navigate('/register')
    }
    return(
        <div className="home-container">
        <h1> Welcome to Firebase Messaging Task</h1>
        <button className="home-button" onClick={handleLogin}> Login </button>
        <button className="home-button" onClick={handleRegister}> Register </button>
        </div>
    )
}

export default Home;