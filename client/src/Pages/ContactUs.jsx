import "../css/Contactus.css"
import { Header } from "../Components/Header";
import {Footer} from "../Components/Footer"
import { useEffect, useState } from "react";

export function ContactUs(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
      });

      const { name, email} = formData;
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/sendmail', {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ name, email })
          });
          const data = await res.json();
          console.log(data);
          alert('Email sent successfully!');
          setFormData({ username: '', email: '' });
        } catch (err) {
          console.error(err);
          alert('Internal server error. Please try again later.');
        }
      };

    const contactUsPage = async ()=>{
        try {
            const res = await fetch('/getData', {
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            });

            const data =  await res.json();
            setFormData(data);
            if(!data || data.error){
                const error = new Error(data.error);
                throw error;
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
      contactUsPage();
    }, [])
    

    return(
        <div className="contactus">
            <Header/>
            <div className="d-flex justify-content-center">
            <h1 className="h1 fw-bolder d-flex justify-content-center p-2 my-4" style={{backdropFilter: "blur(10px)", fontSize: "3rem", borderRadius: "1rem"}}>Subscribe</h1>
            </div>
            <div className="d-flex flex-row justify-content-center my-5">
                <div className="card w-75" style={{width: "18rem"}}>
                    <div className="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputText" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputText" name="name" aria-describedby="emailHelp"  value={formData.username} onChange={handleChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange}/>
                        </div>
                        <button type="submit" onClick={handleSubmit} class="btn" style={{background: "black", color: "white"}}>Subscribe</button>
                    </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}
