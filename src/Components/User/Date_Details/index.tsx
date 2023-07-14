import Chip from '@mui/material/Chip';
import { useContext } from 'react';
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
    return (
        <>
            {
                appContext?.appData.selectedData.date.from ?
                    <div>
                        <Chip sx={{ m: 2 }} label={`From: ${appContext?.appData.selectedData.date.from}`} variant="outlined" />
                        <Chip sx={{ m: 1 }} label={`To: ${appContext?.appData.selectedData.date.to}`} variant="outlined" />
                        <Chip sx={{ m: 1 }} label="Date" variant="outlined" onDelete={emptySelectedDate} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedData.month ?
                    <div>
                        <Chip sx={{ m: 2 }} label={`Month: ${appContext?.appData.selectedData.month}`} variant="outlined" />
                        <Chip sx={{ m: 1 }} label="Month" variant="outlined" onDelete={emptyMonth} />
                    </div>
                    : <></>
            }
            {
                appContext?.appData.selectedData.week ?
                    <div>
                        <Chip sx={{ m: 2 }} label={`Week: ${appContext?.appData.selectedData.week}`} variant="outlined" />
                        <Chip sx={{ m: 1 }} label="Week" variant="outlined" onDelete={emptyWeek} />
                    </div>
                    : <></>
            }
        </>
    )
}