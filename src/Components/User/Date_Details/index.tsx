import { Chip, Alert } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../App';
import { produce } from 'immer';
export default function Date_Details() {
    const appContext = useContext(AppContext);
    function emptyFile() {
        appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { status: false, done: false } }))
    }
    function emptySelectedDate() {
        appContext?.setAppData(produce((draft) => { draft.selectedTime.date = { from: '', to: '' } }))
    }
    function emptyMonth() {
        appContext?.setAppData(produce((draft) => { draft.selectedTime.month = '' }))
    }
    function emptyWeek() {
        appContext?.setAppData(produce((draft) => { draft.selectedTime.week = '' }))
    }
    useEffect(() => {
        if (appContext?.appData.fileUpload_State.done) {
            setTimeout(() => {
                appContext?.setAppData(produce((draft) => { draft.fileUpload_State = { ...draft.fileUpload_State, done: false } }))
            }, 3000)
        }
        if (appContext?.appData.nameUpload_State.done) {
            setTimeout(() => {
                appContext?.setAppData(produce((draft) => { draft.nameUpload_State = { ...draft.nameUpload_State, done: false } }))
            }, 3000)
        }
    }, [appContext])
    return (
        <>
            {
                appContext?.appData.fileUpload_State.done ? <Show_Feedback status={appContext?.appData.fileUpload_State.status} name='File' /> : <></>
            }
            {
                appContext?.appData.nameUpload_State.done ? <Show_Feedback status={appContext?.appData.nameUpload_State.status} name='Name' /> : <></>
            }
            {
                appContext?.appData.fileUpload_State.file ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1 }} label="File" variant="outlined" onDelete={emptyFile} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedTime.date.from ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`From: ${appContext?.appData.selectedTime.date.from}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label={`To: ${appContext?.appData.selectedTime.date.to}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Date" variant="outlined" onDelete={emptySelectedDate} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedTime.month ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`Month: ${appContext?.appData.selectedTime.month}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Month" variant="outlined" onDelete={emptyMonth} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedTime.week ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`Week: ${appContext?.appData.selectedTime.week}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Week" variant="outlined" onDelete={emptyWeek} />
                    </div>
                    : <></>
            }
        </>
    )
}

function Show_Feedback(props: { status: boolean, name: string }) {
    return (
        <div style={{ display: 'flex', width: '100%', margin: '2rem', justifyContent: 'center' }}>
            {
                props.status ?
                    <Alert severity="success" style={{ width: '50%' }}>{props.name} Uploaded</Alert>
                    : <Alert severity="error" style={{ width: '50%' }}>{props.name} Upload Failed</Alert>
            }
        </div>
    )
}