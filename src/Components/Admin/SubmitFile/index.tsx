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
            formData.append('csvFile', appContext?.appData.fileUpload_State.file);
            formData.append('startDate', appContext?.appData.selectedTime.date.from);
            formData.append('endDate', appContext?.appData.selectedTime.date.to);
            fetch(`${environment.url}/DataInsert`, {
                method: 'POST',
                body: formData,
            })
                .then(() => {
                    appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { ...draft.fileUpload_State, done: true, status: true } }))
                })
                .catch(() => {
                    appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { ...draft.fileUpload_State, done: true, status: false } }))
                })
        }
    }
    return (
        <div>
            <Button variant="contained" onClick={submitFile}>Submit File</Button>
        </div>
    )
}