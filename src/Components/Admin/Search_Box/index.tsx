import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AppContext } from "../../../App";
import { useContext, SyntheticEvent } from "react";
import { produce } from "immer";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function Search_Box() {
    const appContext = useContext(AppContext);
    return (
        <div>
            <TextField id="outlined-basic" label="Search Name" variant="outlined" style={{ width: 300 }}
            onChange={(e) => appContext?.setAppData(produce((draft) => { draft.namesSearchData = e.target.value }))} />
        </div>
    )
}
