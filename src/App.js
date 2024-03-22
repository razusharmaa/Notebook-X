import React from 'react'
import NavBar from './component/NavBar'
import { HashRouter,Routes,Route } from 'react-router-dom'
import Home from "./component/Home"
import About from "./component/About"
import NoteState from './context/note/NoteState'
import Alert1 from './component/Alert1'
import EditNote from './component/EditNote'
import Addnote from './component/Addnote'

export default function App() {
  const [alert,setAlert]=React.useState({mode:'OFF',msg:"",type:""})
  const showAlert=(msg1,type1)=>{
    setAlert({mode:'ON',msg:msg1,type:type1})
    setTimeout(()=>{
      setAlert({mode:'OFF'})
    },3000)
  }
  return (
    <>
    <NoteState showAlert={showAlert} >
    <HashRouter>
      <NavBar/>
      {alert.mode === 'ON' && <Alert1 variant={alert.type} msg={alert.msg} />}
      <div className='container my-2'>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/about" element={ <About/> } />
        <Route exact path="/note/editNote" element={ <EditNote alert={showAlert} /> } />
        <Route exact path="/note/createNote" element={ <Addnote/> } />
      </Routes>
      </div>
    </HashRouter>
    </NoteState>
    </>
  )
}
