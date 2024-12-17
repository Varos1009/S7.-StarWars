import React, { useEffect, useState } from "preact/compat";
import { useNavigate } from "react-router-dom";
import Login, { signInWithGoogle } from "../firebase/Auth";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn, setIsSignIn] = useState(false);

    // 🔥 Use useEffect to navigate once user is logged in
    useEffect(() => {
        if (userLoggedIn) {
            navigate("/"); // navigate only when userLoggedIn is true
        }
    }, [userLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            Login(email, password).catch(() => setIsSignIn(false)); // Catch the error to reset the button
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            signInWithGoogle().catch(() => setIsSignIn(false)); // Catch the error to reset the button
        }
    }

    return (
        <div className="container">
            <i className="bi bi-x-circle text-white fs-2 float-end " onClick={() => navigate("/")} style={{ cursor: "pointer" }} title="Close"></i>
            <div className="row d-flex justify-content-center mt-2 mt-md-5">
                <div className="card my-5 mx-auto bg-dark col-12 col-lg-6">
                    <div className="card-body">
                        <h1 className="card-title text-center text-warning">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-warning border rounded-5 rounded-md-3 d-block mx-auto mt-5 w-50">Submit</button>
                        </form>
                        <div className="d-flex flex-column flex-lg-row f justify-content-center align-items-center mt-3">
                            <p className="text-white mb-0 mb-lg-auto">Don't have an account? </p>
                            <p className="text-danger text-decoration-underline ms-2" type="button" onClick={() => navigate("/register")} >Register</p>
                        </div>
                        <div className="row d-flex justify-content-center mt-2 mt-lg-5  mx-auto">
                            <button className="btn btn-light col-12 col-md-6  border rounded-5 rounded-md-3" onClick={handleGoogleSignIn}><i className="bi bi-google me-2 text-danger"></i> Sign in with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
