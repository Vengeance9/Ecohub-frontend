export const successHandler = ({setMessage,setMessageType,message="Operation Successful",onSuccess}:{
    setMessage:(msg:string)=>void,
    setMessageType:(msg:string)=>void,
    message?:string,
    onSuccess?:()=>void
})=>{
    {
      setMessage("Successfully subscribed! Stay tuned for updates.");
      setMessageType("success");
      onSuccess?.()
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
      
    }
}

export const errorHandler = ({error,setMessage,setMessageType}:any)=>{
    const errorMsg = error.message || "Something went wrong. Please try again.";

    setMessage(errorMsg);
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
}