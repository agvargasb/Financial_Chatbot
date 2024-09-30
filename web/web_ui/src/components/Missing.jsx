
import "./Missing.css"
import { Link } from "react-router-dom"
import { robot404 } from "../assets"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <img src={robot404} alt="not found 404"/>
            <p className="Missingp">Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing