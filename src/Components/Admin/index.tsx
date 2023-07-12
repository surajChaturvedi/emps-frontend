import { Button } from "@mui/material"
import User from "../User"
import Logout from "../Logout"
import { useState, useEffect } from "react";
export default function Admin() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setSelectedFile(event.target.files[0]);
    };
    useEffect(() => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('File', selectedFile);

            fetch('https://example.com/upload', {
                method: 'POST',
                body: formData,
            })
        }
    }, [selectedFile])

    return (
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
            <User />
            <Logout />
        </div>
    )
}