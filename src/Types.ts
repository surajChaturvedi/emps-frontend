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
    date: { from: string, to: string }
}

export type childrenType = {
    children: ReactElement,
    name?: string
}
export type allEmployeesDataType = {
    employee_name: string,
    points: number,
    id?: number
}
type AppContextType = {
    selectedTime: selectedTimeType,
    namesSearchData: string,
    getData?: getDataType[],
    fileUpload_State: fileUpload_StateType;
    nameUpload_State: nameUpload_StateType;
    allEmployees?: { fetchNow: boolean, data: allEmployeesDataType[] }
}
export type appDataType = {
    appData: AppContextType,
    setAppData: React.Dispatch<React.SetStateAction<AppContextType>>
}
export type getDataType = {
    name: string,
    points: number,
    id?: number | undefined
}
type fileUpload_StateType = {
    file?: File,
    done: boolean,
    status: boolean
}
type nameUpload_StateType = Omit<fileUpload_StateType, 'file'>

