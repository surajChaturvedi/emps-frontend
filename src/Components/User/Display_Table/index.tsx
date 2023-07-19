import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', width: 300, align: 'center' },
    { field: 'Points', headerName: 'Points', width: 100, align: 'center' },
];

const rows = [{ name: '', point: 0 }];

export default function Display_Table() {
    return (
        <>
            {
                rows[0].name.length > 0 ?
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
                    : <></>
            }
        </>
    );
}
