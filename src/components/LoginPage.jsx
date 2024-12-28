import React, { useEffect, useState } from "preact/compat";
import { useNavigate } from "react-router-dom";
import { Login, signInWithGoogle } from "../firebase/Auth";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn, setIsSignIn] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/");
        }
    }, [userLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            setError(null);
            try {
                await Login(email, password);
            } catch (err) {
                setError("Invalid login or password."); 
            } finally {
                setIsSignIn(false);
            }
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            setError(null);
            try {
                await signInWithGoogle();
            } catch (err) {
                setError("Google sign-in failed. Please try again.");
            } finally {
                setIsSignIn(false);
            }
        }
    };

    return (
        <div className="container">
            <i
                className="bi bi-x-circle text-white fs-2 float-end"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                title="Close"
            ></i>
            <div className="row d-flex justify-content-center mt-2 mt-md-5">
                <div className="card my-5 mx-auto bg-dark col-12 col-lg-6">
                    <div className="card-body">
                        <h1 className="card-title text-center text-warning">LOGIN</h1>
                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-white">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning border rounded-5 rounded-md-3 d-block mx-auto mt-5 w-50"
                                disabled={isSignIn}
                            >
                                {isSignIn ? "Signing in..." : "Submit"}
                            </button>
                        </form>
                        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center mt-3">
                            <p className="text-white mb-0 mb-lg-auto">Don't have an account?</p>
                            <p
                                className="text-danger text-decoration-underline ms-2"
                                type="button"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </p>
                        </div>
                        <div className="row d-flex justify-content-center mt-2 mt-lg-5 mx-auto">
                            <button
                                className="btn btn-light col-12 col-md-6 border rounded-5 rounded-md-3"
                                onClick={handleGoogleSignIn}
                                disabled={isSignIn}
                            >
                                <i className="bi bi-google me-2 text-danger"></i>
                                {isSignIn ? "Signing in with Google..." : "Sign in with Google"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
