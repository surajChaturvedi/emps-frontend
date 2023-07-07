export type errorStateType = {
    email: errorStateObjType,
    password: errorStateObjType
}
type errorStateObjType = {
    state: boolean,
    inValidMsg: string
}

export type loginStateTypes = {
    emailValue: string,
    setEmailValue: React.Dispatch<React.SetStateAction<string>>,
    passwordValue: string,
    setPasswordValue: React.Dispatch<React.SetStateAction<string>>
}