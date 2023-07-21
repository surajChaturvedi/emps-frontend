import { Chip, Alert } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../App';
import { produce } from 'immer';
export default function Date_Details() {
    const appContext = useContext(AppContext);
    function emptySelectedDate() {
        appContext?.setAppData(produce((draft) => { draft.selectedData.date = { from: '', to: '' } }))
    }
    function emptyMonth() {
        appContext?.setAppData(produce((draft) => { draft.selectedData.month = '' }))
    }
    function emptyWeek() {
        appContext?.setAppData(produce((draft) => { draft.selectedData.week = '' }))
    }
    useEffect(() => {
        if (appContext?.appData.fileUpload_Data.done) {
            setTimeout(() => {
                appContext?.setAppData(produce((draft) => { draft.fileUpload_Data = { ...draft.fileUpload_Data, done: false } }))
            }, 3000)
        }
    }, [appContext?.appData.fileUpload_Data.done])
    return (
        <>
            {
                appContext?.appData.fileUpload_Data.done ? <ShowFileUpload_Feedback /> : <></>
            }
            {
                appContext?.appData.selectedData.date.from ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`From: ${appContext?.appData.selectedData.date.from}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label={`To: ${appContext?.appData.selectedData.date.to}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Date" variant="outlined" onDelete={emptySelectedDate} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedData.month ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`Month: ${appContext?.appData.selectedData.month}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Month" variant="outlined" onDelete={emptyMonth} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedData.week ?
                    <div className='filter_block'>
                        <Chip sx={{ marginRight: 1, marginLeft: 4 }} label={`Week: ${appContext?.appData.selectedData.week}`} variant="outlined" />
                        <Chip sx={{ marginRight: 1 }} label="Week" variant="outlined" onDelete={emptyWeek} />
                    </div>
                    : <></>
            }
        </>
    )
}

function ShowFileUpload_Feedback() {
    const appContext = useContext(AppContext);
    return (
        <div style={{ display: 'flex', width: '100%', margin: '2rem' }}>
            {
                appContext?.appData.fileUpload_Data.status ?
                    <Alert severity="success" style={{ width: '50%' }}>File Uploaded</Alert>
                    : <Alert severity="error" style={{ width: '50%' }}>File Upload Failed</Alert>
            }
        </div>
    )
}