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
export type selectedTimeType = {
    week: string,
    month: string,
    date: { from: string, to: string }
}

export type childrenType = {
    children: ReactElement,
    name?: string
}
type AppContextType = {
    selectedTime: selectedTimeType,
    namesSearchData: string,
    getData: getDataType[],
    fileUpload_State: fileUpload_StateType;
    nameUpload_State: nameUpload_StateType;
}
export type getDataType = {
    name: string,
    points: number,
    id: number
}
type fileUpload_StateType = {
    file?: File,
    done: boolean,
    status: boolean
}
type nameUpload_StateType = Omit<fileUpload_StateType, 'file'>
export type appDataType = {
    appData: AppContextType,
    setAppData: React.Dispatch<React.SetStateAction<AppContextType>>
}
