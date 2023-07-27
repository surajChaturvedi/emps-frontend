import { Button } from "@mui/material"
import User from "../User"
import Logout from "../Logout"
import { useState, useEffect, useContext } from "react";
import Date_Details from "../User/Date_Details";
import Display_Table from "../User/Display_Table";
import Search_Box from "./Search_Box";
import { AppContext } from "../../App";
import Submit from "../Submit";
import { produce } from "immer";
import SubmitFile from "./SubmitFile";
export default function Admin() {
    const appContext = useContext(AppContext);
    const [showLogout, setShowLogout] = useState('logout');
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { ...draft.fileUpload_State, file: event.target.files![0] } }));
        }
    };
    function showEmployees() {
        appContext?.setAppData(prev => { return { ...prev, allEmployees: { fetchNow: true, data: [] } } })
    }
    useEffect(() => {
        if ((appContext?.appData.selectedTime.date.from?.length === 0 || appContext?.appData.selectedTime.date.from === undefined) && (appContext?.appData.selectedTime.date.to?.length === 0 || appContext?.appData.selectedTime.date.to === undefined) && (appContext?.appData.fileUpload_State.file === undefined)) {
            setShowLogout('logout')
        }
        else if (appContext?.appData.fileUpload_State.file) {
            setShowLogout('submitFile')
        }
        else if ((appContext?.appData.namesSearchData || appContext?.appData.allEmployees?.fetchNow) && (appContext?.appData.selectedTime.date.from || appContext?.appData.selectedTime.date.to)) {
            setShowLogout('submitData')
        }
    }, [appContext?.appData])
    return (
        <>
            <div className="admin_block">
                <div className="animate">
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload CSV
                        <input
                            type="file"
                            hidden
                            name="file" onChange={changeHandler}
                        />
                    </Button>
                </div>
                <div className="animate">
                    <Search_Box />
                </div>
                <div className="animate">
                    <User />
                </div>
                <div className="animate">
                    <Button variant='contained' sx={{ marginRight: 10 }} onClick={showEmployees}>Show All Employees</Button>
                </div>
                <div className="animate">
                    {showLogout === 'logout' ? <Logout /> : <></>}
                    {showLogout === 'submitData' ? <Submit /> : <></>}
                    {showLogout === 'submitFile' ? <SubmitFile /> : <></>}
                </div>
            </div>
            <Date_Details />
            <Display_Table />
        </>
    )
}