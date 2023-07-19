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
export default function Admin() {
    const appContext = useContext(AppContext);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showLogout, setShowLogout] = useState(true);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setSelectedFile(event.target.files[0]);
    };
    async function sendFile() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('CSVFile', selectedFile);
            try {
                const response = await fetch('https://example.com/upload', {
                    method: 'POST',
                    body: formData,
                })
                if (response.ok) {
                    appContext?.setAppData(produce((draft) => { draft.fileUpload_Status = { done: true, status: true } }))
                }
            } catch (error) {
                appContext?.setAppData(produce((draft) => { draft.fileUpload_Status = { done: true, status: false } }))
            }
        }
    }
    useEffect(() => {
        sendFile();
    }, [selectedFile])
    useEffect(() => {
        if ((appContext?.appData.selectedData.week?.length === 0 || appContext?.appData.selectedData.week === undefined) && (appContext?.appData.selectedData.month?.length === 0 || appContext?.appData.selectedData.month === undefined) && (appContext?.appData.selectedData.date.from?.length === 0 || appContext?.appData.selectedData.date.from === undefined) && (appContext?.appData.selectedData.date.to?.length === 0 || appContext?.appData.selectedData.date.to === undefined)) {
            setShowLogout(true)
        }
        else {
            setShowLogout(false)
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
                {showLogout ? <Logout /> : <Submit />}
            </div>
            <Date_Details />
            <Display_Table />
        </>
    )
}