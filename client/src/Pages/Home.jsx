import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"
import bg from "../assets/images/Homebg.png"
import "../css/Home.css"

export function Home(){
    return(
        <div className="homepage">
            <Header/>
            <img className="homebg img-fluid" src={bg} alt="" />
            <div className="instructions d-flex flex-column justify-content-center align-items-center my-5" >
                <div className="d-flex flex-column align-items-center py-3 px-4" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}}> 
                    <h1 className="h1 fw-bold">Instructions</h1>
                    <p>1. Upload any pdf file or write text in following spaces</p>
                    <p>2. You must press the submit button to see the report</p>
                    <p>3. You will get Results below the input cards</p>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around my-5">
                <div className="card" style={{width: "18rem"}}>
                    <div className="mx-2 card-body">
                        <h5 className="card-title">Upload a Pdf/Text File</h5>
                        <p className="card-text">Upload any pdf or text file in which blog, tweet or news is written</p>
                        <input type="text" name="" id="" placeholder="Enter related name" className="homeupload my-2" style={{border: "1px solid lightgray", borderRadius: "0.5rem", padding: "0.25rem"}}/>
                        <input type="file" name="" id="" className="fileupload"/>
                        <button type="submit" className="my-1">Submit</button>
                    </div>
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="mx-2 card-body">
                        <h5 className="card-title">Write Text</h5>
                        <p className="card-text">Write any tweet, blog or news here</p>
                        <input type="text" name="" id="" placeholder="Enter related name" className="homeupload my-2" style={{border: "1px solid lightgray", borderRadius: "0.5rem", padding: "0.25rem"}}/>
                        <textarea type="text" name="" id="" className="homeupload" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}} cols="30" rows="2" placeholder="Enter text here"></textarea>
                        <button type="submit" className="my-1">Submit</button>
                    </div>
                </div>
            </div>
            <div className="mx-4 my-5 py-3 px-4" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}}>
                <h3 className="h3">Last Search Details:</h3>
                <div className="d-flex flex-column">
                    <table>
                        <tr style={{borderBottom: "1px solid lightgray"}}>
                            <td>1. Imran Khan Tweet</td>
                            <td>Real</td>
                        </tr>
                        <tr style={{borderBottom: "1px solid lightgray"}}>
                            <td>2. Blog about React Js</td>
                            <td>Real</td>
                        </tr>
                        <tr style={{borderBottom: "1px solid lightgray"}}>
                            <td>3. News about elections 2023</td>
                            <td>Fake</td>
                        </tr>
                        <tr style={{borderBottom: "1px solid lightgray"}}>
                            <td>4. Vacations News in Comsats University</td>
                            <td>Real</td>
                        </tr>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    );

}



// export default Home;