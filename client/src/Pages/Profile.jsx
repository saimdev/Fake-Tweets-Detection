import "../css/Profile.css"
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer"
import profile from "../assets/images/profile.jpg"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {

    const [userData, setUserData]=useState('');

    const navigate = useNavigate();

    useEffect(() => {
    
      callProfileRoute();
      
    }, []);

    const callProfileRoute = async()=>{
        try{
            const res = await fetch('/about', {
                method:'GET',
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            const data = await res.json();
            console.log(data);
            setUserData(data);
            if (!data || data.error){
                navigate('/signin');
            }

        }catch(err){
            console.log(err)
        }
    }
    

    return (
        <div className="profile">
            <Header />
            <div className="d-flex justify-content-center">
                <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{ backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem" }}>Profile</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
            <div className="card w-75" style={{ width: "18rem" }}>
                <div className=" d-flex flex-column align-items-center p-3">
                    <img src={profile} alt="" style={{ borderRadius: "100px", width: "200px" }} />

                </div>
                <div className="d-flex justify-content-center" >
                    <form >
                        <div class="form-group my-3">
                            {/* <label for="exampleInputEmail1">Name</label> */}
                            <input type="text" class="form-control" id="exampleInputEmail1" name="name" placeholder="Enter name" value={userData.username} />
                        </div>
                        <div class="form-group my-3">
                            {/* <label for="exampleInputEmail1">Email</label> */}
                            <input type="text" class="form-control" id="exampleInputEmail1" name="email" placeholder="Enter email" value={userData.email} />
                        </div>
                        <div class="form-group my-3" >
                            {/* <label for="exampleInputEmail1">Password</label> */}
                            <input type="text" class="form-control" id="exampleInputEmail1" name="password" placeholder="Enter password" value={userData.password} />
                        </div>
                    </form>
                </div>
                <div class="col d-flex flex-column align-items-center my-2">
                    <p>Total number of Reports: {userData.reports}</p>
                    <p>See all reports: <a href="#!" className="text-reset">Reports</a></p>
                </div>
            </div>
            </div>

            <Footer />
        </div>
    );
}
