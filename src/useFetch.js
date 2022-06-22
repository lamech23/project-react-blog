
import { useState,useEffect } from "react";


const useFetch=(url)=>{

    const[ data,setData]=useState(null);
    const[ isPending ,setIsPending]=useState(true)
    const[error,setError]=useState(null)
   

    useEffect(()=>{
        const AbortCont  = new AbortController()


        setTimeout(()=>{
            fetch(url ,{signal:AbortCont.signal})
            .then(res =>{
                // console.log(res)
                if(!res.ok){
                  throw Error('Failed to fetch data from the resource')  
                }
                
             return res.json()
            })
            .then(data =>{
                setData(data)
                setIsPending(false)
                setError(null)
    
            })
            .catch((err)=>{
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }else{
                    setIsPending(false)
                    setError(err.message)
        

                }
              
            })
        },2000)
        return ()=> AbortCont.abort()
            
        },[url]);
       return { data,isPending,error}

}
export default useFetch;