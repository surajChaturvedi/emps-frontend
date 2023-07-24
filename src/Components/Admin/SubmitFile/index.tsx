import { Button } from "@mui/material"
import { environment } from "../../../environment"
import { AppContext } from "../../../App"
import { useContext } from "react";
import { produce } from "immer";
export default function SubmitFile() {
    const appContext = useContext(AppContext);
    function submitFile() {
        if (appContext?.appData.fileUpload_State.file) {
            const formData = new FormData();
            formData.append('CSVFile', appContext?.appData.fileUpload_State.file);
            formData.append('from', appContext?.appData.selectedTime.date.from);
            formData.append('to', appContext?.appData.selectedTime.date.to);
            fetch(`${environment.url}`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { done: true, status: true } }))
                })
                .catch(error => {
                    appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { done: true, status: false } }))
                })
        }
    }
    return (
        <div>
            <Button variant="contained" onClick={submitFile}>Submit File</Button>
        </div>
    )
}