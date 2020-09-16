import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import {toast} from "react-toastify"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
function Newgame(){
    const history = useHistory()
    let questionstoinsert = []
    let answerstoinsert = []
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [newgame,setnewgame] = main.newgame
    const [games,setgames] = main.games
    const [upcominggames,setupcominggames] = main.upcominggames
    const [currentstate,setcurrentstate] = useState({})
    const [points,setpoints] = useState(0)
    const [questions,setquestions] = useState(0)
    const [files, setFiles] = useState([])
    useEffect(()=>{
      if(currentstate.pictures){
        connectserver()
      } 
    },[currentstate])
    function onchange(e){
        if(e.target.name==="questions"){
            if(!e.target.value || parseInt(e.target.value)<0){
              setquestions(0)
            }
            else{
           var value= parseInt(e.target.value)
           setquestions(value)
            }
        }
        setcurrentstate({...currentstate,[e.target.name]:e.target.value})
    }
useEffect(()=>{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
   if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("datefield").setAttribute("min", today);
},[])
 async function  connectserver(){
     const id=currentuser.pk
    const name = await fetch(`http://localhost:8000/newgame/${id}/`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(currentstate)
      })
      const ss = await name.json()
      let sample = {
          pk:ss[0].pk,
          ...ss[0].fields
      }
      toast.success("Successfully Created",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
      setgames([...games,sample])
      setupcominggames([...upcominggames,sample])
      history.push("/homepage")
 }
    function onsubmit(e){
     e.preventDefault()
     setcurrentstate(prev=>({...prev,pictures:questionstoinsert,answers:answerstoinsert}))
    }
  
    function photoupload(e,index){
        if(e.length===0){
            return "some"
        }
        else{
          let file_url = "http://localhost:8000/media/"+e[0].file.name
          questionstoinsert[index]=file_url
        }
    }
    function answer(e,index){
        answerstoinsert[index]=e.target.value
    }
    return(
        <div className="mb-5">
        <p className="text-center mt-5 text-dark font-weight-bold font-italic" style={{fontSize:"28px"}}>New Game</p>
        <div className="d-flex justify-content-center mt-3 ">
        <form className="col-4" onSubmit={e=>onsubmit(e)}>
        <p className="font-italic pb-1 mb-0" style={{fontWeight:600}}>Game Name:</p>
        <input type="text" className="form-control mb-2" placeholder="Game Name" onChange={e=>onchange(e)} name="name" value={currentstate.name} required/>
        <p className="font-italic pb-1 mb-0" style={{fontWeight:600}}>Game URL:</p>
        <input type="text" className="form-control mb-2" placeholder="Game Logo URL" onChange={e=>onchange(e)} name="image" value={currentstate.image} required/>
        <p className="font-italic pb-1 mb-0" style={{fontWeight:600}}>Start Date:</p>
        <input type="date" id="datefield" className="form-control mb-2" placeholder="Game Start Date" onChange={e=>onchange(e)} name="startdate" value={currentstate.startdate} required/>
        <p className="font-italic pb-1 mb-0" style={{fontWeight:600}}>End Date:</p>
        <input type="date" id="datefield" className="form-control mb-2" placeholder="Game End Date" onChange={e=>onchange(e)} name="enddate" value={currentstate.enddate} required/>
        <p className="text-center font-italic mb-2 ml-2" style={{fontWeight:600,fontSize:"20px"}}>Timings</p>
        <div className="d-flex justify-content-between">
        <div className="d-flex ">
        <p className="font-italic pb-1 mb-0 mr-2 mt-1" style={{fontWeight:600}} >Start:</p>
        <input type="time" className="form-control mb-2" placeholder="Starting Time" onChange={e=>onchange(e)} name="starttime" value={currentstate.starttime} required/>
        </div>
        <div className="d-flex ">
        <p className="font-italic pb-1 mb-0 mr-2 mt-1" style={{fontWeight:600}} >End:</p>
        <input type="time" className="form-control mb-2" placeholder="Ending Time" onChange={e=>onchange(e)} name="endtime" value={currentstate.endtime} required/>
        </div>
        </div>
        <div className="d-flex justify-content-between">
        <input type="number" className="form-control mb-2 mt-2" placeholder="Points Per Question" onChange={e=>onchange(e)} name="points" value={currentstate.points} required/>
        <input type="text" className="form-control mb-2 mt-2 ml-3" placeholder="Prize For the Winner!!!" onChange={e=>onchange(e)} name="prize" value={currentstate.prize} required/>
       </div>
       <p className="font-italic mb-0 mr-2 mt-1" style={{fontWeight:600}} >No of Questions:</p>
       <input type="number" placeholder="No of Questions" className="form-control mb-2 mt-2"  onChange={e=>onchange(e)} name="questions" value={currentstate.questions} required/>
     { 
        questions===0?null:
        [...Array(questions)].map((e,index)=>{
            return(
                <div key={index}>
                <p className="font-italic pb-1 mb-0 mr-2 mt-1" style={{fontWeight:600}} >Question {index+1}:</p>
                <FilePond server={"http://localhost:8000/upload/"} onupdatefiles={e=>photoupload(e,index)} name="files"/>
                <input type="text" className="form-control mb-2 mt-0" placeholder="Answer" onChange={e=>answer(e,index)} name="answer" required/>
                </div>
            )
        })
     }
       <button className="btn mt-3 btn-warning btn-block font-weight-bold font-italic">CREATE</button>
        </form>
        </div>
        </div>
    )
}

export default Newgame