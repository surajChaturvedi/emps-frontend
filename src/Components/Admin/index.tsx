import { Button } from "@mui/material"
import User from "../User"
import Logout from "../Logout"
import { useState, useEffect, useContext } from "react";
import Date_Details from "../User/Date_Details";
import Display_Table from "../User/Display_Table";
import Search_Box from "./Search_Box";
import { AppContext } from "../../App";
import Submit from "../Submit";
export default function Admin() {
    const appContext = useContext(AppContext);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showLogout, setShowLogout] = useState(true);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setSelectedFile(event.target.files[0]);
    };
    useEffect(() => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('CSVFile', selectedFile);

            fetch('https://example.com/upload', {
                method: 'POST',
                body: formData,
            })
        }
    }, [selectedFile])
    useEffect(() => {
        if (appContext?.appData.selectedData.week.length === 0 && appContext?.appData.selectedData.month.length === 0 && appContext?.appData.selectedData.date.from.length === 0 && appContext?.appData.selectedData.date.to.length === 0) {
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