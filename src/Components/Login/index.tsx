import { Button } from "@mui/material"
import InputBox from "./InputBox";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();
    async function sendLoginData(e: Event | undefined) {
        if (e) e.preventDefault();
        const response = await fetch('https://76fb-14-97-233-14.in.ngrok.io/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })
        if (response.ok) {
            const data = await response.json();
            console.log('data: ', data);
            Cookies.set('token', data.token, { expires: new Date(Date.now() + 31536000000) });
            Cookies.set('path', data.path, { expires: new Date(Date.now() + 31536000000) })
            navigate(`/${data.path.toLowerCase()}`);
        }
        else {
            // Handle errors
            console.log(response.status, response.statusText);
        }

    }
    return (
        <section className="login-section" onSubmit={() => sendLoginData(event)}>
            <form className="login-Box">
                <h1 className="heading">Login</h1>
                <InputBox loginState={{ emailValue, passwordValue, setEmailValue, setPasswordValue }}></InputBox>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </section>
    )
}  
