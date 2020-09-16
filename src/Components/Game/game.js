import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import {toast} from "react-toastify"
import "./game.css"
import Cards from "../Cards/cards"
function Game(props){
    const main = useContext(createcontext)
    const history = useHistory()
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [newgame,setnewgame] = main.newgame
    const [games,setgames]= main.games
    const [clickedgame,setclickedgame] = main.clickedgame
    const [questions,setquestions] = useState([])
    const [answers,setanswers] = useState([])
    const [players,setplayers] = useState([])
    async function sample(){
        let gameid = clickedgame.pk
        const s= await fetch(`http://localhost:8000/getwinner/${gameid}`)
        const response = await s.json()
        setplayers(response)
    }
    useEffect(()=>{
     sample()
    },[])
    async function getfromback(){
        let gameid = clickedgame.pk
        const s = await fetch(`http://localhost:8000/gamebyid/${gameid}`)
        const response = await s.json()
        let questionfromback = JSON.parse(response.question)
        questionfromback.map((e,index)=>{
            //console.log(e)
            setquestions(prev=>[...prev,e.fields.question])
            setanswers(prev=>[...prev,e.fields.answer])
        })
        
    }
    useEffect(()=>{
      getfromback()
    },[])
    return(
          <div className="mt-3">
          <p className="text-center font-weight-normla display-4">{clickedgame.name}</p>
          <div className="d-flex justify-content-center"><img src={clickedgame.image}  width="350" height="250"/></div>
          <div className="d-flex justify-content-center mt-3">
          <p className="font-weight-bold text-light font-italic mx-5 pr-2 mb-0 pb-0 pl-5" style={{fontSize:"24px"}}>DATE</p>
          
          <p className="font-weight-bold text-light font-italic mx-5 mb-0 pb-0" style={{fontSize:"24px",paddingLeft:"40px"}}>TIME</p>
          </div>
          <div className="d-flex justify-content-center">
          <div className="d-flex">
          <p className="font-weight-bold font-italic" style={{fontSize:"15px"}}>{clickedgame.startdate}</p>
          <p className="font-weight-bold font-italic mx-2" style={{fontSize:"15px"}}>To</p>
          <p className="font-weight-bold font-italic" style={{fontSize:"15px"}}>{clickedgame.enddate}</p>
          </div>
          <div className="ml-4 pl-4 d-flex">
          <p className="font-weight-bold font-italic" style={{fontSize:"15px"}}>{clickedgame.starttime}</p>
          <p className="font-weight-bold font-italic mx-2" style={{fontSize:"15px"}}>To</p>
          <p className="font-weight-bold font-italic" style={{fontSize:"15px"}}>{clickedgame.endtime}</p>
          </div>
          </div>
          <div className="container d-flex justify-content-center">
          <div className="pt-3 topcards mr-2" style={{width:"200px",height:"130px",backgroundColor:"white"}}>
        <p className="text-center font-italic text-danger" style={{fontWeight:700,fontSize:"22px"}}>Prize</p>
        <p className="text-center font-italic text-dark" style={{fontWeight:600,fontSize:"20px"}}>{clickedgame.prize}</p>
        </div>
        <div className="pt-3 topcards" style={{width:"200px",height:"130px",backgroundColor:"white"}}>
        <p className="text-center font-italic text-primary" style={{fontWeight:700,fontSize:"22px"}}>No of Players</p>
        <p className="text-center font-italic text-dark" style={{fontWeight:600,fontSize:"20px"}}>{players.length}</p>
        </div>
        </div>
          <p className="font-weight-bold font-italic text-center mb-2 mt-5"style={{fontSize:"22px"}}>QUESTIONS</p>
          <hr className="mt-0 pt-0" style={{width:"350px",borderBottom:"2px solid black"}}/>
          <div className="container mb-3">
          {
              questions.map((e,index)=>{
                 return(
                     <div className={`${index%2===0?"bg-light":"b"} container d-flex justify-content-around py-3`} style={{borderBottom:"1px solid black"}}>
                    <h4 className="font-weight-bold" style={{paddingTop:"90px"}}>{index+1}.</h4>
                     <img className="img-thumbnail" src={e} width="200"/>
                     <h4 className="font-weight-bold font-italic" style={{paddingTop:"90px",width: "110px"}}>{answers[index]}</h4>
                     </div>
                 )
              })
          }
          </div>
          <p className="font-weight-bold font-italic text-center mb-2 mt-5"style={{fontSize:"22px"}}>PLAYERS LIST</p>
          <hr className="mt-0 pt-0" style={{width:"350px",borderBottom:"2px solid black"}}/>
          {players.length>0?
          <table class="container table table-hover">
  <thead className="thead-dark">
    <tr>
      <th className="text-center" scope="col">NO</th>
      <th className="text-center" scope="col">NAME</th>
      <th className="text-center" scope="col">EMAIL</th>
      <th className="text-center" scope="col">POINTS</th>

    </tr>
  </thead>
  <tbody className="bg-light">
  {
    players.map((e,index)=>{
       return(
           <tr scope="row" className={`${index%2===0?"bg-light":"b"} container py-4`} style={{borderBottom:"1px solid black"}}>
          <td><h5 className="font-weight-bold text-center">{index+1}.</h5></td>
           <td><h6 className="font-weight-bold font-italic text-center">{e.name}</h6></td>
           <td><h6 className="font-weight-bold font-italic text-center">{e.email}</h6></td>
           <td><h6 className="font-weight-bold font-italic text-center">{e.points}</h6></td>
           </tr>
       )
    })
}
  </tbody>
</table>:
<h2 className="container text-center font-weight-normal bg-light my-5 pt-5 pb-5" style={{height:200}}>No Players</h2>
}
          </div>
       
    )
}

export default Game