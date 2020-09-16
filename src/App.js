import React,{useState,createContext,useContext, useEffect} from 'react';
import {Switch,Link,Route, useHistory, useLocation} from 'react-router-dom'
import './App.css';
import Login from "./Components/Login/login"
import Games from "./Components/Games/games"
import Newgame from "./Components/Newgame/newgame"
import Signup from "./Components/Signup/signup"
import 'react-toastify/dist/ReactToastify.css'
import Homepage from "./Components/Homepage/homepage"
import Game from "./Components/Game/game"
import { toast } from "react-toastify";
export const createcontext = createContext()
export const Contextvariables = (props)=>{
  const [loggedin,setloggedin] = useState(true)
  const [currentuser,setcurrentuser] = useState({
    date_created: "2020-08-25T05:03:07.123Z",
email: "mahaperiyavar100@gmail.com",
mobile_no: "9677861286",
name: "Vasanth",
password: "123456",
pk: 1
  })
  
  const [games,setgames] = useState([])
  const [newgame,setnewgame] = useState({})
  const [players,setplayers] = useState([])
  const [clickedgame,setclickedgame] = useState({})
  const [upcominggames,setupcominggames] = useState([])
  return(
    <createcontext.Provider value={{
      loggedin : [loggedin,setloggedin],
      currentuser:[currentuser,setcurrentuser],
      games:[games,setgames],
      players:[players,setplayers],
      newgame:[newgame,setnewgame],
      clickedgame:[clickedgame,setclickedgame],
      upcominggames:[upcominggames,setupcominggames]
    }}>
    {props.children}
    </createcontext.Provider>
  )
}
toast.configure({autoClose:2000});
function App() {
  const history = useHistory()
  const location = useLocation()
  const [title,settitle] = useState("green")
  const main = useContext(createcontext)
  const [loggedin,setloggedin] = main.loggedin
  const [currentuser,setcurrentuser] = main.currentuser
  const [games,setgames]= main.games
  const [upcominggames,setupcominggames] = main.upcominggames
  async function frombackend(){
    let id = currentuser.pk
    const s = await fetch(`http://localhost:8000/game/${id}`)
    const response = await s.json()
    response.map((e,index)=>{
        let sample = {
            pk:e.pk,
            ...e.fields
        }
       setgames(prev=>[...prev,sample])
       setupcominggames(prev=>[...prev,sample])
    })
}
  useEffect(()=>{  
    if(loggedin===false && location.pathname!=="/login" &&  location.pathname!=="/signup"){
       history.push("/")
    }
    frombackend()
  },[])
  function onclick(){
    setloggedin(false)
    toast.success("Logged out Successfully",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
    setTimeout(()=>{
      window.location.reload();
    },2000)
   
  }
  let pathname = window.location.pathname
  return (
    <React.Fragment>
    <div  style={{backgroundColor:"white"}}>
    <nav className="navbar navbar-expand ">
    <div className="container ml-3" style={{maxWidth:"none"}}>
    <div className="d-flex justify-content-start">
    <Link to="/" className="navbar-brand text-dark font-weight-bold font-italic" style={{fontSize:27}}>NYKAA</Link>
    {loggedin?
    <ul className="navbar-nav" style={{marginLeft: "20px",
      paddingTop: "6px"}}>
    <li className="nav-item">
      <Link to="/homepage" className="nav-link text-dark font-italic"  style={{fontWeight:600,fontSize:16}}>Dashboard</Link>
    </li>
    <li className="nav-item ml-3">
    <Link to="/games" className="nav-link text-dark font-italic"  style={{fontWeight:600,fontSize:16}}>My Games</Link>
    </li>
    </ul>:null
    }
    </div>
  <div className="d-flex justify-content-end mt-2 mr-2">
  <div className="d-flex">
  {loggedin?
    <div className="d-flex justify-content-between">
    <p className="pt-2 font-italic" style={{fontWeight:600,fontSize:16}}>{currentuser.email}</p>
    <Link to="/" className="mt-1"><button className="btn btn-sm btn-warning font-weight-bold ml-2 border border-dark logout px-3 font-italic" onClick={onclick}>Log Out</button></Link>
    </div>
    :
    <div className="d-flex">
  <Link to="/login"><p className=" font-italic text-dark mr-2" style={{fontWeight:600,fontSize:18}}>Login</p></Link>
  <Link to="/signup"><p className=" font-italic text-dark ml-4" style={{fontWeight:600,fontSize:18}}>Sign Up</p></Link>
  </div>
  }
  </div>
  </div>
    </div>
   </nav>
   </div>
 
    <Switch>
    <Route path="/login" exact  component={Login} />
    <Route path="/signup" exact  component={Signup} />
    <Route path="/homepage" exact  component={Homepage} />
    <Route path="/games" exact  component={Games} />
    <Route path="/newgame" exact component={Newgame} />
    <Route path="/game" exact component={Game} />
    <Route path="/" exact >
    {
      pathname==="/"?
      <div  id="stepsId">
      <div className="container" style={{paddingLeft:"120px",paddingTop:"150px"}}>
      <p className="container font-italic  font-weight-bold  display-4 mb-0" style={{color:"coral",fontSize:80}}>NYKAA GAMES</p>
      <p className="container text-left font-weight-bold font-italic mt-2 " style={{fontSize:17,color:"white",fontWeight:600,paddingLeft:"190px"}}> World of Game Creation</p>
      <Link to="/login" className="d-flex" style={{paddingLeft:"195px"}}><button className="d-flex font-weight-bold mt-1 px-5  btn btn-secondary" style={{borderRadius:"20px",backgroundColor:"black",color:"white"}}>EXPLORE</button></Link>
      </div>
      </div>
      :null
         }
    </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
