import { childrenType } from "../../Types"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AllowLogin(props: childrenType) {
    const navigate = useNavigate();
    const [renderChild, setRenderChild] = useState(false)
    useEffect(() => {
        const cookie = Cookies.get('token');
        const path = Cookies.get('path');
        if (cookie && path?.toLowerCase() === props.name) setRenderChild(true)
        else navigate('/');
    }, [])
    return (
        <>
            {renderChild ? props.children : <></>}
        </>
    )
}
