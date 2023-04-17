import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = (props) => {

    const navigation = useNavigate();


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save auth token and redirect
            localStorage.setItem('token', json.token);

            props.showAlert("Account created successfully", "success")
            navigation("/");

        }
        else {
            console.log(json.success);
            props.showAlert("invalid details", "danger")
        }



    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    return (
        <div className="container" >
            <h2 className="mt-5 mb-3"> Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" required onChange={onChange} id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" required onChange={onChange} id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" minLength={5} required className="form-control" onChange={onChange} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" minLength={5} required className="form-control" onChange={onChange} id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div >
    )
}

export default Signup
