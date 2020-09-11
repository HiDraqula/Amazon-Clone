import React, { useState, useEffect } from 'react';
import './Login.css'
import { Link, useHistory, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from '../StateProvider';

function Login() {
    const history = useHistory();
    // const location = history.location;
    const location = useLocation();

    const [{ user }] = useStateValue();

    // const query = new URLSearchParams(search);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log({ history, location })




    const Next = () => {
        console.log(location)
        let next = location.state?.next || '/';
        history.push(next)
        // history.push(location.state?.next || '/')
        // history.push('/')
    }

    useEffect(() => {
        if (user) {
            Next()
        }
    }, [])

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                Next()

            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    Next()
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in Here</h1>
                {/* <h1>{location.state?.next ? 'Please Sign-in First' : 'Sign-in Here'}</h1> */}

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton accent-btn'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton accent-btn2 '>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
