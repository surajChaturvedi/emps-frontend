import { Button } from "@mui/material"
import User from "../User"
import Logout from "../Logout"
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
            <Logout />
        </div>
    )
}