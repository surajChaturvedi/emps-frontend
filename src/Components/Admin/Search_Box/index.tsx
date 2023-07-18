import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AppContext } from "../../../App";
import { useContext, SyntheticEvent } from "react";
import { produce } from "immer";
import { namesDataType } from "../../../Types";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function Search_Box() {
    const appContext = useContext(AppContext);
    return (
        <div>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={Names}
                disableCloseOnSelect
                onChange={(event: SyntheticEvent<Element, Event>, newValue: namesDataType[]) => {
                    appContext?.setAppData(produce((draft) => { draft.namesSearchData = newValue }))
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} label="Search" placeholder="Type Here" />
                )}
            />
        </div>
    )
}
const Names: namesDataType[] = [{ name: "Actor" },
{ name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" }, { name: "Actor" },
]
