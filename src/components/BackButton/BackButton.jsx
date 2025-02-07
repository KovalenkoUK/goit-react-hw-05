import { useNavigate, useLocation } from "react-router-dom";


function BackButton() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(location.state ?.prevLocation || "/")}>
            Go Back
    </button>
    );
}

export default BackButton;
