import "../css/Contactus.css"
import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"

export function ContactUs(){
    return(
        <div className="contactus">
            <Header/>
            <div className="d-flex justify-content-center">
            <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem"}}>Contact Us</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-75" style={{width: "18rem"}}>
                    <div className="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputText" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputText" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn" style={{background: "black", color: "white"}}>Submit</button>
                    </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}
