import { TextField } from "@mui/material"
import { useState, useEffect } from 'react'
import { errorStateType } from "../../Types";
import { emailValidate, checkEmailRequired, checkPasswordRequired, passwordValidate } from "../../Functions";
import { Password } from "@mui/icons-material";
export default function InputBox() {
    const [errorState, setErrorState] = useState<errorStateType>({
        email: { state: false, inValidMsg: "Invalid Email Format" },
        password: { state: false, inValidMsg: "Invalid Password Format" }
    })
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    useEffect(() => {
        if (emailValue !== '') {
            emailValidate(emailValue, setErrorState);
        }
        if (passwordValue !== '') {
            passwordValidate(passwordValue, setErrorState)
        }
    }, [emailValue, passwordValue])

    return (
        <div className="input-Box">
            <TextField onChange={(e) => setEmailValue(e.target.value)} value={emailValue} onBlur={() => checkEmailRequired(emailValue, setErrorState)} error={errorState.email.state} helperText={errorState.email.state ? errorState.email.inValidMsg : ""} label="Email" variant="outlined" margin="normal" fullWidth />
            <TextField onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} onBlur={() => checkPasswordRequired(passwordValue, setErrorState)} error={errorState.password.state} helperText={errorState.password.state ? errorState.password.inValidMsg : ""} label="Password" type="password" variant="outlined" margin="normal" fullWidth />
        </div>
    )
}