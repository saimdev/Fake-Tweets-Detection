import "../css/HowToUse.css"
import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"
import ss1 from "../assets/images/ss1.png"
import ss2 from "../assets/images/ss2.png"
import ss3 from "../assets/images/ss3.png"
import ss4 from "../assets/images/ss4.png"

export function HowToUse(){
    return(
        <div className="howtouse">
            <Header/>
            <div className="d-flex justify-content-center">
            <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem"}}>How To Use</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-75" style={{width: "18rem"}}>
                    <div className="card-body">
                        <p className="fw-bold" style={{background: "black", color: "white"}}>1. Register your account on this website</p>
                        <img src={ss1} alt="" className="my-3 img-fluid d-flex justify-content-center flex-row" style={{border: "2px solid black", borderRadius: "0.5rem"}}/>
                        <p className="fw-bold" style={{background: "black", color: "white"}}>2. After Login, go to home page and upload any pdf file or write news/blog/tweet in form of text and also write name of that report</p>
                        <img src={ss2} alt="" className="my-3 img-fluid d-flex justify-content-center flex-row" style={{border: "2px solid black", borderRadius: "0.5rem"}}/>
                        <p className="fw-bold" style={{background: "black", color: "white"}}>3. After this, press 'Submit' Button</p>
                        <img src={ss3} alt="" className="my-3 img-fluid d-flex justify-content-center flex-row" style={{border: "2px solid black", borderRadius: "0.5rem"}}/>
                        <p className="fw-bold" style={{background: "black", color: "white"}}>4. Finally, you see output after predicting that whether input news is fake or not in Pop-up Screen</p>
                        <p className="fw-bold" style={{background: "black", color: "white"}}>5. You have record of your all reports in 'Reports' page mentioned on top of web app</p>
                        <img src={ss4} alt="" className="my-3 img-fluid d-flex justify-content-center flex-row" style={{border: "2px solid black", borderRadius: "0.5rem"}}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}
