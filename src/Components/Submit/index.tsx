import Button from '@mui/material/Button';
export default function Submit() {
    function submitData() {
        console.log("Send Data");
    }
    return (
        <Button variant="contained" onClick={submitData}>Submit</Button>
    )
}