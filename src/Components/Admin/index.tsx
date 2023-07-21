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
            appContext?.setAppData(produce((draft) => { draft.fileUpload_Data = { ...draft.fileUpload_Data, file: event.target.files![0] } }));
        }
    };
    useEffect(() => {
        if ((appContext?.appData.selectedData.week?.length === 0 || appContext?.appData.selectedData.week === undefined) && (appContext?.appData.selectedData.month?.length === 0 || appContext?.appData.selectedData.month === undefined) && (appContext?.appData.selectedData.date.from?.length === 0 || appContext?.appData.selectedData.date.from === undefined) && (appContext?.appData.selectedData.date.to?.length === 0 || appContext?.appData.selectedData.date.to === undefined)) {
            setShowLogout('logout')
        }
        else if (appContext?.appData.fileUpload_Data.file && appContext?.appData.selectedData.date.from && appContext?.appData.selectedData.date.to) {
            setShowLogout('submitFile')
        }
        else {
            setShowLogout('submitData')
        }
    }, [appContext?.appData])
    return (
        <>
            <div className="admin_block">
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload CSV
                    <input
                        type="file"
                        hidden multiple
                        name="file" onChange={changeHandler}
                    />
                </Button>
                <Search_Box />
                <User />
                {showLogout === 'logout' ? <Logout /> : <></>}
                {showLogout === 'submitData' ? <Submit /> : <></>}
                {showLogout === 'submitFile' ? <SubmitFile /> : <></>}
            </div>
            <Date_Details />
            <Display_Table />
        </>
    )
}