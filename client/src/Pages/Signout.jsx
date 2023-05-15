import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Signout(){

    const navigate = useNavigate();

    useEffect(() => {
      loggingOut();
    }, [])

    const loggingOut = async()=>{
         const res = await fetch('/logout',{
            method:'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
         })

         const data = await res;
         if(data){
            navigate('/');
         }
    }
    
    return(
        <div>
            <p>Logout ka page</p>;
        </div>
    )
}