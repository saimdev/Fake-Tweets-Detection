import "../css/Signin.css"
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Signin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // let name, value;
    // const handleUser = (e)=>{
    //     name = e.target.name;
    //     value = e.target.value;
    //     setUser({...user, [name]:value});
    // }

    const loginUser = async (e)=>{
        e.preventDefault();
        const res = await fetch('/login', {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email, password:password
            })
        });
        
        const data = await res.json();
        console.log(data);

        if(data.status===400 || !data){
            window.alert("Invalid Credentials")
        }
        else{
            window.alert("Successfully Logged IN");
            navigate('/');
        }
    }

    return (
        <div className="Signin">
            <Header />
            <div className="d-flex justify-content-center">
                <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{ backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem" }}>Signin</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-50 py-2 px-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <form method="POST">
                        <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <input type="submit" onClick={loginUser} className="btn" style={{ background: "black", color: "white" }} value="Signin"/>
                        </form>
                        <p className="m-3">Create new account: <a href="/register" className="text-reset">Signup here</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );


}
