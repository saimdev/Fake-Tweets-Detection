import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useEffect, useState } from "react";
import '../css/Header.css';

export function Header() {
  const [authToken, setAuthToken] = useState(""); // State to store the authToken value

  useEffect(() => {
    const authTokenCookie = getCookie("authToken"); // Get the authToken cookie value

    setAuthToken(authTokenCookie); // Update the authToken state with the cookie value
  }, []);

  function getCookie(name) {
    const cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return cookieValue ? cookieValue.pop() : "";
  }

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">
            <div className="navbar-nav">
              <Link to="/home" className="nav-item nav-link mx-5 d-flex flex-row align-items-center">
                <HomeRoundedIcon />
                <em>Home</em>
              </Link>
              <Link to="/reports" className="nav-item nav-link mx-5 d-flex align-items-center">
                <AssessmentRoundedIcon />
                <em>Reports</em>
              </Link>
              <Link to="/howtouse" className="nav-item nav-link mx-5 d-flex align-items-center">
                <InfoRoundedIcon />
                <em>How To Use</em>
              </Link>
              <Link to="/contact" className="nav-item nav-link mx-5 d-flex align-items-center">
                <ContactPhoneRoundedIcon />
                <em>Subscribe</em>
              </Link>
              <Link to="/profile" className="nav-item nav-link mx-5 d-flex align-items-center">
                <AccountCircleRoundedIcon />
                <em>Profile</em>
              </Link>
              {authToken ? (
                // Render "Signout" if authToken exists
                <Link to="/signout" className="nav-item nav-link mx-5 d-flex align-items-center">
                  <ExitToAppRoundedIcon />
                  <em>Signout</em>
                </Link>
              ) : (
                // Render "Signin" if authToken doesn't exist
                <Link to="/signin" className="nav-item nav-link mx-5 d-flex align-items-center">
                  <ExitToAppRoundedIcon />
                  <em>Signin</em>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
