import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
    const navigate = useNavigate();
    function logout() {
        Cookies.remove('token');
        Cookies.remove('path');
        navigate('/');
    }
    return (
        <Button variant="outlined" onClick={logout}>Logout</Button>
    )
}