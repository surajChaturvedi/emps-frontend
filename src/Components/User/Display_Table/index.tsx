import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppContext } from '../../../App';
import { useContext } from 'react';
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300, align: 'center' },
    { field: 'points', headerName: 'Points', width: 100, align: 'center' },
];

export default function Display_Table() {
    const appContext = useContext(AppContext);
    if (appContext?.appData.getData) {
        return (
            <>
                {
                    appContext?.appData.getData[0].name.length > 0 ?
                        <section style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem' }}>
                            <div style={{ height: 400, width: 'auto' }} className='tableBlock'>
                                <DataGrid
                                    rows={appContext?.appData.getData}
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
