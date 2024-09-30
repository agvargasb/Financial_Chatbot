import "./Missing.css"
import { Link } from "react-router-dom"
import { constructon } from "../assets"

const ComingSoon = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            
            <p className="Missingp">Site Under Construction.</p>
            <img src={constructon} alt="not found 404"/>
            <p className="Missingp">More features will be coming soon ...</p>
            <p className="Missingp">Stay tuned.</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default ComingSoon