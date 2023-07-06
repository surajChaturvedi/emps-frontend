import { Button } from "@mui/material"
import InputBox from "../InputBox"
export default function Login() {
    return (
        <section className="login-section">
            <form className="login-Box">
                <h1 className="heading">Login</h1>
                <InputBox></InputBox>
                <Button variant="contained" type="submit">Submit</Button>
            </form>

        </section>
    )
}