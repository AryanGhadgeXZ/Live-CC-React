import {useState,useRef,useEffect} from "react";
import axios from "axios";

function Converter(){
    const rAmt = useRef();
    const [amt,setAmt] = useState("");
    const [msg,setMsg] = useState("");
    const [dollar,setDollar] = useState("");

    const hAmt = (event) => {setAmt(event.target.value);}
    
    useEffect(() => {
        let url = "https://api.exchangerate-api.com/v4/latest/USD";
        axios.get(url)
        .then(res => setDollar(res.data.rates.INR))
        .catch(err => console.log("issue" + err));

    },[]);

    const convert = (event) => {
        event.preventDefault();

        if (amt == ""){
            alert("You did not enter Amount");
            setMsg("");
            rAmt.current.focus();
            return;
        }

        let a = parseFloat(amt);
        let r = a * dollar;
        let ans = "\u20B9" + r.toFixed(2);
        setMsg(ans);
    }

    return(
        <>
        <center>
            <div class="div">
                <h1>Live Currency converter</h1>
                <form onSubmit={convert}>
                    <input type="number" step="any" placeholder="Enter Amt in $" onChange={hAmt} ref={rAmt}/>
                    <br/>
                    <input type="submit" value="Convert" class="btn"/>
                </form>
                <h2>{msg}</h2>
            </div>
        </center>
        </>
    );
}

export default Converter;