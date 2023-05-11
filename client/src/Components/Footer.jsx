import { Link } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
    return (
        <div className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
                </div>
                <div>
                <a href="" className="me-4 text-reset">
                    <FacebookIcon/>
                </a>
                <a href="" className="me-4 text-reset">
                    <TwitterIcon/>
                </a>
                <a href="" className="me-4 text-reset">
                    <GoogleIcon/>
                </a>
                <a href="" className="me-4 text-reset">
                    <InstagramIcon/>
                </a>
                <a href="" className="me-4 text-reset">
                    <LinkedInIcon/>
                </a>
                <a href="https://github.com/saimdev" className="me-4 text-reset">
                    <GitHubIcon/>
                </a>
                </div>
            </section>
            <section className="">
                <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Fake News Detection
                    </h6>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae ut, similique veritatis repellat hic odit eveniet magnam porro commodi quasi.
                    </p>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Products
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">Generate Report</a>
                    </p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Useful links
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">Reports</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">How to Use</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Subscribe</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">Profile</a>
                    </p>
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                    <p>Comsats University, Wah Campus</p>
                    <p>ayeshaamjad016@gmail.com</p>
                    <p>0312-1213192</p>
                    <p>0312-1213192</p>
                    </div>
                </div>
                </div>
            </section>
            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2023 Copyright: 
                <a className="text-reset fw-bold" href="">FakeNewsDetection.com</a>
            </div>

        </div>
    );


}
