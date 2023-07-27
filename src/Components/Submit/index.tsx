import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { environment } from '../../environment';
import { produce } from 'immer';
import { getDataType, appDataType, allEmployeesDataType } from '../../Types';
export default function Submit() {
    const appContext = useContext(AppContext);
    return (
        <Button variant="contained" onClick={() => submitData(appContext)}>Submit</Button>
    )
}
function submitData(appContext: appDataType | null) {
    if (!appContext?.appData.allEmployees?.fetchNow) {
        if (appContext?.appData.namesSearchData) {
            fetch(`${environment.url}/DataRetrieve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startDate: appContext?.appData.selectedTime.date.from,
                    endDate: appContext?.appData.selectedTime.date.to,
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
                    appContext?.setAppData(produce((draft) => {
                        draft.nameUpload_State = { done: true, status: true }
                    }))
                })
                .catch(() => {
                    appContext?.setAppData(produce((draft) => {
                        draft.nameUpload_State = { done: true, status: false }
                    }))
                })
        }
    }
    else if (appContext?.appData.allEmployees?.fetchNow) {
        fetch(`${environment.url}/all`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                appContext?.setAppData(produce((draft) => {
                    let count = 0
                    if (draft.allEmployees?.data) draft.allEmployees.data = data.map((el: allEmployeesDataType) => {
                        return { name: el.employee_name, points: el.points, id: count++ }
                    })
                    count = 0
                }))
                appContext?.setAppData(produce((draft) => {
                    if (draft.allEmployees?.fetchNow) draft.allEmployees.fetchNow = false
                }))
            })
    }
}