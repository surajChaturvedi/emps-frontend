import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { AppContext } from '../../../App';
import { produce } from 'immer';
export default function Date_Details() {
    const appContext = useContext(AppContext);
    function emptySelectedDate() {
        appContext?.setAppData(produce((draft) => { draft.selectedData.date = { from: '', to: '' } }))
    }
    return (
        <>
            {
                appContext?.appData.selectedData.date.from ?
                    <>
                        <Chip label={`From: ${appContext?.appData.selectedData.date.from}`} variant="outlined" />
                        <Chip label={`To: ${appContext?.appData.selectedData.date.to}`} variant="outlined" />
                        <Chip label="Deletable" variant="outlined" onDelete={emptySelectedDate} />
                    </>
                    : <></>
            }
        </>
    )
}