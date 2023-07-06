export type errorStateType = {
    email: errorStateObjType,
    password: errorStateObjType
}
type errorStateObjType = {
    state: boolean,
    inValidMsg: string
}