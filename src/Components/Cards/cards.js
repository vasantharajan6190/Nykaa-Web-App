import React,{useState,useContext} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import {toast} from "react-toastify"
function Cards(props){
    const main = useContext(createcontext)
    const history = useHistory()
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [newgame,setnewgame] = main.newgame
    const [games,setgames]= main.games
    const [clickedgame,setclickedgame] = main.clickedgame
    function onclick(){
       setclickedgame(props.e)
       history.push("/game")
    }
    return(
        <div onClick={onclick}  className="games"  style={{width:"280px",borderRadius:"10px",backgroundColor:"white"}}>
        <img src={props.e.image} width="280" height="200"/>
        <p className="pt-2 text-center font-italic text-dark" style={{fontWeight:700,fontSize:"20px"}}>{props.e.name}</p>
        <div className="d-flex justify-content-center">
        <p className="font-weight-bold font-italic"  style={{fontSize:"20px"}}>Prize:</p>
        <p className="font-italic pt-1 ml-2" style={{fontWeight:600}}>{props.e.prize}</p>
        </div>
        
        <div className="d-flex justify-content-around container">
        <p className="font-weight-bold font-italic" style={{fontSize:"20px"}}>Date:</p>
        <p className="font-italic pt-1 ml-2" style={{fontWeight:600}}>{props.e.startdate} </p>
        <p className="font-weight-bold px-1 pt-1">To</p>
        <p className="font-italic pt-1 " style={{fontWeight:600}}>{props.e.enddate}</p>
        </div>
        <div className="d-flex justify-content-around container">
        <p className="font-weight-bold font-italic" style={{fontSize:"20px"}}>Time:</p>
        <p className="font-italic pt-1 ml-2" style={{fontWeight:600}}>{props.e.starttime} </p>
        <p className="font-weight-bold pl-2 pr-1 pt-1">To</p>
        <p className="font-italic pt-1 ml-2" style={{fontWeight:600}}>{props.e.endtime}</p>
        </div>
        
        </div>
    )
}

export default Cards