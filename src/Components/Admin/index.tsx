import { Button } from "@mui/material"
export default function Admin() {
    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Upload CSV
                <input
                    type="file"
                    hidden multiple
                />
            </Button>

        </div>
    )
}