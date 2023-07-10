import { Button } from "@mui/material"
import User from "../User"
export default function Admin() {
    return (
        <div className="admin_block">
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
            <User />
        </div>
    )
}