import { childrenType } from "../../../Types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RedirectLogin(props: childrenType) {
    const navigate = useNavigate();
    const [renderChild, setRenderChild] = useState(false)
    useEffect(() => {
        const cookie = Cookies.get('token');
        const path = Cookies.get('path');
        if (!cookie) setRenderChild(true);
        else navigate(`/${path?.toLowerCase()}`);
    }, [])
    return (
        <>
            {renderChild ? props.children : <></>}
        </>
    )
}
