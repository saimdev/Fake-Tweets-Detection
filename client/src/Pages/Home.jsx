import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"
import bg from "../assets/images/Homebg.png"
import "../css/Home.css"
import {SearchDetails} from "../Components/SearchDetails"
import { useState, useEffect } from "react";
export function Home(){

    const [result, setResult] = useState("");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getLastReports();
    }, [])

    const getLastReports = async () => {
        setLoading(true);
        try {
            const res = await fetch('/getLastReports', {
                method: 'GET',
                headers: {
                    "Content-Type": "applicatio/json"
                }
            })
            const data = await res.json();
            if (!data || data.error) {
                console.log(data.error)
            }
            setReports(data);
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
          }
    }

    async function handleSubmit(event) {
      event.preventDefault();
  
      const userInput = document.getElementById("user-input").value;
      const name = document.getElementById("name").value;
    console.log(userInput);
    try{
        setLoading(true);
        const response = await fetch("/getResult", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, userInput })
          });
      
          const responseData = await response.json();
          if(responseData.error || !responseData){
            alert(responseData.error);
            window.location.reload();
          }
          console.log(responseData);
          setResult(responseData.result);
    }catch(err){console.log(err)
    }finally {
        setLoading(false);
      }
      
    }      

    return(
        <div className="homepage">
            <Header/>
            <img className="homebg img-fluid" src={bg} alt="" />
            <div className="instructions d-flex flex-column justify-content-center align-items-center my-5" >
                <div className="d-flex flex-column align-items-center py-3 px-4" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}}> 
                    <h1 className="h1 fw-bold">Instructions</h1>
                    <p>1. Wrtie any text, news or tweet in following spaces</p>
                    <p>2. You must press the submit button to see the report</p>
                    <p>3. You will get Results below the input cards</p>
                    <p>4. Refresh the page after result to use again</p>
                </div>
            </div>
            <form method="post">
            <div className="d-flex flex-row justify-content-around my-5">
                <div className="card" style={{width: "18rem"}}>
                    <div className="mx-2 card-body">
                        <h5 className="card-title">Write Text</h5>
                        <p className="card-text">Write any tweet, blog or news here</p>
                        <input type="text" name="" id="name" placeholder="Enter related name" className="homeupload my-2" style={{border: "1px solid lightgray", borderRadius: "0.5rem", padding: "0.25rem"}} required/>
                        <textarea type="text" name="" id="user-input" className="homeupload" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}} cols="30" rows="2" placeholder="Enter text here" required></textarea>
                        <button type="submit" className="my-1" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            </form>
            {loading ? (
                <div className="loader">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mx-1 my-1">Please wait... it will take sometime</p>
                </div>
                ):(
                    <span className="visually-hidden">Loading...</span>
                )
            }
            {
                result==="real"?(
                    <p className="h1 fw-bold text-center text-success">{result}</p>
                ):(
                    <p className="h1 fw-bold text-center text-danger">{result}</p>
                )
            }
            
            <div className="mx-4 my-5 py-3 px-4" style={{border: "1px solid lightgray", borderRadius: "0.5rem"}}>
                <h3 className="h3">Last Search Details:</h3>
                <div className="d-flex flex-column">
                {reports.length ? (
                    <SearchDetails reports={reports}/>
                ) : (
                    <p>No search details available.</p>
                )}

                </div>
            </div>
            <Footer/>
        </div>
    );

}



// export default Home;