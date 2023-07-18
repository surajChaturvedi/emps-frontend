import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function Submit() {
    function submitData() {
        console.log("Send Data");
    }
    return (
        <Button variant="contained" onClick={submitData}>Submit</Button>
    )
}