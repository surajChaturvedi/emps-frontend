import { TextField } from "@mui/material"
import { useState, useEffect } from 'react'
import { errorStateType, loginStateTypes } from "../../../Types";
import { emailValidate, checkEmailRequired, checkPasswordRequired, passwordValidate } from "../../../Functions";
export default function InputBox({ loginState }: { loginState: loginStateTypes }) {
    const [errorState, setErrorState] = useState<errorStateType>({
        email: { state: false, inValidMsg: "Invalid Email Format" },
        password: { state: false, inValidMsg: "Invalid Password Format" }
    })

    useEffect(() => {
        if (loginState.emailValue !== '') {
            emailValidate(loginState.emailValue, setErrorState);
        }
        if (loginState.passwordValue !== '') {
            passwordValidate(loginState.passwordValue, setErrorState)
        }
    }, [loginState.emailValue, loginState.passwordValue])

    return (
        <div className="input-Box">
            <TextField onChange={(e) => loginState.setEmailValue(e.target.value)} value={loginState.emailValue} onBlur={() => checkEmailRequired(loginState.emailValue, setErrorState)} error={errorState.email.state} helperText={errorState.email.state ? errorState.email.inValidMsg : ""} label="Email" variant="outlined" margin="normal" fullWidth />
            <TextField onChange={(e) => loginState.setPasswordValue(e.target.value)} value={loginState.passwordValue} onBlur={() => checkPasswordRequired(loginState.passwordValue, setErrorState)} error={errorState.password.state} helperText={errorState.password.state ? errorState.password.inValidMsg : ""} label="Password" type="password" variant="outlined" margin="normal" fullWidth />
        </div>
    )
}