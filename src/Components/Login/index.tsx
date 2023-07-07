import { Button } from "@mui/material"
import InputBox from "../InputBox"
import { useState } from "react";
export default function Login() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    async function sendLoginData(e: Event) {
        e.preventDefault();
        const response = await fetch('https://grumpy-baboons-vanish.loca.lt/user/login', {
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
            const data = await response.text();
            console.log(data);
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