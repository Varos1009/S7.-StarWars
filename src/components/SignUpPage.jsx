import React, { useState } from "preact/compat";
import { useNavigate } from "react-router-dom";
import {Register} from "../firebase/Auth";


const SignUpPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isRegister) {
            if (!validateEmail(email)) {
                alert("Please enter a valid email address");
                return;
            }
    
            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }
    
            if (!email || !password) {
                alert("Email and password must be provided");
                return;
            }
    
            setIsRegister(true);
            try {
                //
                const userCredential = await Register(email, password); 
                const user = userCredential.user; 
                console.log("User Registered:", user);
                navigate("/login"); 
            } catch (error) {
                console.error("Registration Error: ", error.message);
                alert(`Error: ${error.message}`);
                setIsRegister(false);
            }
        }
    };
    
    


    return (
        <div className="container">
            <i className="bi bi-x-circle text-white fs-2 float-end " onClick={() => navigate("/")} style={{ cursor: "pointer" }} title="Close"></i>
            <div className="row d-flex justify-content-center mt-2 mt-md-5">
                <div className="card my-5 mx-auto bg-dark col-12 col-lg-6">
                    <div className="card-body">
                        <h1 className="card-title text-center text-warning">REGISTER</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-warning border rounded-5 rounded-md-3 d-block mx-auto mt-5 w-50" disabled={isRegister}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
