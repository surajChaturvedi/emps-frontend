import { TextField } from "@mui/material";
import { AppContext } from "../../../App";
import { useContext } from "react";
import { produce } from "immer";

export default function Search_Box() {
    const appContext = useContext(AppContext);
    return (
        <>
            <TextField id="outlined-basic" label="Search Name" variant="outlined" style={{ width: 300 }}
            onChange={(e) => appContext?.setAppData(produce((draft) => { draft.namesSearchData = e.target.value }))} />
        </>
    )
}
