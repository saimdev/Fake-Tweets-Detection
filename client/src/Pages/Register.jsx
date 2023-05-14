import "../css/Register.css"
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer"
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function Register() {

    const navigate = useNavigate();
    const [image, setImage]=useState(null);

    // const history = useHistory();

    const [user, setUser] = useState({
        name:"", email:"", password:""
    });

    let name, value;
    const handleUser = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }
    
    
    const PostData = async (e)=>{
        e.preventDefault();
        const {name, email, password} = user;
        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        console.log(image);
        const res = await fetch('/signup', {
            method:'POST',
            body: formData
        })

        const data = await res.json();


        if(data.error || !data){
            window.alert(data.error);
            window.location.reload();
        }else{
            window.alert("Successfully Registered");
            console.log("Successfully Registered")
            navigate('/signin');
        }
    }

    return (
        <div className="register">
            <Header />
            <div className="d-flex justify-content-center">
                <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{ backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem" }}>Register</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-50 py-2 px-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <form method="POST" encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="exampleInputText" className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" id="exampleInputText" aria-describedby="emailHelp" 
                                value={user.name}
                                onChange={handleUser}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                value={user.email}
                                onChange={handleUser}
                                />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Profile picture</label>
                                <input name="image" onChange={(e)=>setImage(e.target.files[0])} accept="image/*" type="file" className="form-control bg-transparent p-2  rounded-2" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                value={user.password}
                                onChange={handleUser}
                                />
                            </div>
                            <input type="submit" className="btn" style={{ background: "black", color: "white" }} value="Register"
                            onClick={PostData}
                            />
                        </form>
                        <p className="m-3">Already have an account? <a href="/signin" className="text-reset">Signin here</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );


}
