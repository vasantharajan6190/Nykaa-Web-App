import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import {toast} from "react-toastify"
import Cards from "../Cards/cards" 
import "./homepage.css"
function Homepage(){
    const history = useHistory()
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [newgame,setnewgame] = main.newgame
    const [games,setgames]= main.games
    const [upcominggames,setupcominggames] = main.upcominggames
    return(
        <div className="container pt-4 mb-3">
        <div>
        <p className="text-left d-flex border-bottom border-dark pb-2 font-weight-bold font-italic" style={{fontWeight:600,fontSize:"20px"}}>Your Dashboard:</p>
        <div className="d-flex justify-content-around">
        <div className="pt-4 topcards" style={{width:"200px",height:"150px",borderRadius:"10px",backgroundColor:"white"}}>
        <p className="text-center font-italic text-warning" style={{fontWeight:700,fontSize:"20px"}}>Total No of games</p>
        <p className="text-center font-italic text-dark" style={{fontWeight:600,fontSize:"26px"}}>25</p>
        </div>
        <div className="pt-4 topcards" style={{width:"200px",height:"150px",borderRadius:"10px",backgroundColor:"white"}}>
        <p className="text-center font-italic" style={{fontWeight:700,fontSize:"20px",color:"red"}}>Current Games</p>
        <p className="text-center font-italic text-dark" style={{fontWeight:600,fontSize:"26px"}}>2</p>
        </div>
        <div className="pt-4 topcards" style={{width:"200px",height:"150px",borderRadius:"10px",backgroundColor:"white"}}>
        <p className="text-center font-italic text-primary" style={{fontWeight:700,fontSize:"20px"}}>Total No of players</p>
        <p className="text-center font-italic text-dark" style={{fontWeight:600,fontSize:"26px"}}>460</p>
        </div>
        </div>
        <div className="d-flex justify-content-between">
        <p className="text-left d-flex pt-5 pb-2 font-weight-bold font-italic" style={{fontWeight:600,fontSize:"20px"}}>Upcoming Games:</p>
        <Link to="/newgame" className="pt-5 pb-2"><button className="btn px-5 border font-italic btn-warning" style={{fontWeight:600}}>Create New Game</button></Link>
        </div>
        <div className="container d-flex justify-content-between mt-3">
        {upcominggames.map((e,index)=>{
            if(index>2){
                return null
            } 
            else{
            return(
            <div className="mx-2">
        <Cards  e={e}/>
        </div>
        )}
    })
        }
        </div>
        <div className="d-flex justify-content-center"><img  src="https://img.pngio.com/wallpaper-digital-art-video-games-t-shirt-minimalism-text-retro-games-png-hd-3508_2480.png" width="250"/></div>
        </div>
        </div>
    )
}

export default Homepage