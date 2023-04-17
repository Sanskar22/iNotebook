import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigation = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save auth token and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Login successfully", "success")
            navigation("/");

        }
        else {
            console.log(json.success);
            props.showAlert("invalid details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="mt-5 mb-3"> Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} name="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='  d-flex route'>
                <h6>Need an accont? </h6>
                <Link className="btn btn-light  link_btn" to="/signup" role="button">Signup </Link>
            </div>

        </div>
    )
}

export default Login
