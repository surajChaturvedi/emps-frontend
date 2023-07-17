import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', width: 300, align: 'center' },
    { field: 'Points', headerName: 'Points', width: 100, align: 'center' },
];

const rows = [
    { id: 1, Name: 'Snow', Points: 0 },
    { id: 2, Name: 'Lannister', Points: 0 },
    { id: 3, Name: 'Lannister', Points: 0 },
    { id: 4, Name: 'Stark', Points: 0 },
    { id: 5, Name: 'Targaryn', Points: 0 },
    { id: 6, Name: 'Melisandre', Points: 0 },
    { id: 7, Name: 'Clifford', Points: 0 },
    { id: 8, Name: 'Frances', Points: 0 },
    { id: 9, Name: 'Roxie', Points: 0 },
];

export default function Display_Table() {
    return (
        <section style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem' }}>
            <div style={{ height: 400, width: 'auto' }} className='tableBlock'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </section>
    );
}
