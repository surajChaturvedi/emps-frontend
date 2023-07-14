import { ReactElement } from 'react';
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
export type selectedDataType = {
    week: string,
    month: string,
    date: { from: string, to: string }
}

export type childrenType = {
    children: ReactElement,
    name?: string
}

export type appDataType = {
    appData: { selectedData: selectedDataType },
    setAppData: React.Dispatch<React.SetStateAction<{
        selectedData: selectedDataType
    }>>
}
