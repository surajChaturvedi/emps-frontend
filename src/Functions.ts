import { errorStateType } from "./Types";
export function emailValidate(emailValue: string, setErrorState: React.Dispatch<React.SetStateAction<errorStateType>>) {
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    if (!emailPattern.test(emailValue)) {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            email: { inValidMsg: "Invalid Email Format", state: true }
        }))
    }
    else {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            email: { inValidMsg: "", state: false }
        }))
    }
}
export function checkEmailRequired(emailValue: string, setErrorState: React.Dispatch<React.SetStateAction<errorStateType>>) {
    if (emailValue === "") {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            email: { inValidMsg: "Email Required", state: true }
        }))
    }
    else {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            email: { inValidMsg: "", state: false }
        }))
    }
}
export function checkPasswordRequired(passwordValue: string, setErrorState: React.Dispatch<React.SetStateAction<errorStateType>>) {
    if (passwordValue === "") {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            password: { inValidMsg: "Password Required", state: true }
        }))
    }
    else {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            password: { inValidMsg: "", state: false }
        }))
    }
}
export function passwordValidate(passwordValue: string, setErrorState: React.Dispatch<React.SetStateAction<errorStateType>>) {
    if (!(passwordValue.length > 2)) {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            password: { inValidMsg: "Invalid Password Format", state: true }
        }))
    }
    else {
        setErrorState((prevState: errorStateType) => ({
            ...prevState,
            password: { inValidMsg: "", state: false }
        }))
    }
}