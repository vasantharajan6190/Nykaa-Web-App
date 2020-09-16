import React,{useState,useContext,useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import {toast} from "react-toastify"
import Cards from "../Cards/cards"
function Games(){
    const history = useHistory()
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [newgame,setnewgame] = main.newgame
    const [games,setgames]= main.games
    return(
        <div className="mt-3 container">
        {games.length===0?null:<h4 className="mt-3 mb-2 text-left font-italic font-weight-normal">Your Games:</h4>}
       <div className="d-flex row justify-content-between mt-3">
        {
            games.length===0? 
            <div className="mt-5 pt-5">
            <p className=" mt-5 text-center font-weight-bold font-italic text-dark" style={{fontSize:"42px"}}>No Game has created by You</p>
            <Link to="/newgame" className="d-flex justify-content-center mt-3"><button className="btn btn-dark border border-dark px-5 font-weight-bold font-italic" style={{borderRadius:"0px"}}>Create Your Game</button></Link>
            </div>
            :
          games.map((e,index)=>
             <div key={index} className="mb-4 col-md-4  col-sm-6">
              <Cards e={e}/>
              </div>
          )
        }
        </div>
        </div>
    )
}

export default Games