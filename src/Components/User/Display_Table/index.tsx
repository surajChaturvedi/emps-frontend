import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppContext } from '../../../App';
import { useContext, useState, useEffect } from 'react';
import { getDataType, allEmployeesDataType } from '../../../Types';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300, align: 'center' },
    { field: 'points', headerName: 'Points', width: 100, align: 'center' },
];

export default function Display_Table() {
    const appContext = useContext(AppContext);
    const [tableData, setTableData] = useState<getDataType[] | undefined>([]);
    useEffect(() => {
        setTableData(appContext?.appData.getData)
    }, [appContext?.appData.getData])
    useEffect(() => {
        setTableData(appContext?.appData.allEmployees?.data.map((el: allEmployeesDataType) => {
            return { name: el.employee_name, points: el.points, id: el.id }
        }))
    }, [appContext?.appData.allEmployees?.data])
    if (appContext?.appData.getData) {
        return (
            <>
                {
                    tableData ?
                        <section style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem' }}>
                            <div style={{ height: 400, width: 'auto' }} className='tableBlock'>
                                <DataGrid
                                    rows={tableData}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </div>
                        </section>
                        : <></>
                }
            </>
        );
    }
}
