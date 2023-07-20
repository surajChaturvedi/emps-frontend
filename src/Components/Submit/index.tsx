import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { environment } from '../../environment';
import { produce } from 'immer';
import { getDataType } from '../../Types';
export default function Submit() {
    const appContext = useContext(AppContext);
    function submitData() {
        fetch(`${environment.url}/DataRetrieve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate: appContext?.appData.selectedData.date.from,
                endDate: appContext?.appData.selectedData.date.to,
                EmployeeName: appContext?.appData.namesSearchData
            })
        })
            .then(response => response.json())
            .then(data => {
                let count = 0
                appContext?.setAppData(produce((draft) => {
                    draft.getData = data.data.map((el: getDataType) => {
                        return { name: el.name, points: el.points, id: count++ }
                    })
                }))
                count = 0;
            })
    }
    return (
        <Button variant="contained" onClick={submitData}>Submit</Button>
    )
}