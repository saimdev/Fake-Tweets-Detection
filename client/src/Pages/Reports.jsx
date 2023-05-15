import "../css/Reports.css"
import { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer";
import {ReportsTable} from "../Components/ReportsTable";
import { useNavigate } from "react-router-dom";

export function Reports(){
    const [reports, setReports]=useState([]);
    const navigate = useNavigate();
    const[loading, setLoading]=useState(false);

    useEffect(() => {
      getReports();
    }, [])

    const getReports = async ()=>{
        setLoading(true);
        const res = await fetch('/getReports', {
            method:'GET',
            headers:{
                "Content-Type":"applicatio/json"
            }
        });

        const data= await res.json();
        if(!data || data.error){
            navigate('/signin')
        }
        // else if(data.notfound){
        //     reports={
        //         userId:"N.A",
        //         name:"N.A",
        //         result:"N.A"
        //     }
        // }
        setLoading(false);
        setReports(data);
    }
    

    return(
        <div className="reports">
            <Header/>
            <div className="d-flex justify-content-center">
            <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem"}}>Reports</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-75" style={{width: "18rem"}}>
                    <div className="card-body" style={{height: "400px", overflowY: "auto"}}>
                    {loading ? (
                        <div className="loader">
                            <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mx-1 my-1">Please wait.... loading reports data</p>
                        </div>
                            ):(
                                <ReportsTable reports={reports}/>
                            )
                    }
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}
