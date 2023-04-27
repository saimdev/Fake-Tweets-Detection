import "../css/Reports.css"
import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"

export function Reports(){
    return(
        <div className="reports">
            <Header/>
            <div className="d-flex justify-content-center">
            <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem"}}>Reports</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-75" style={{width: "18rem"}}>
                    <div className="card-body" style={{height: "400px", overflowY: "auto"}}>
                    <table className="w-100" >
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
            </div>
            <Footer/>
        </div>
    );

}
