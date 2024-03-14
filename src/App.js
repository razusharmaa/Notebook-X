import React from 'react'
import NavBar from './component/NavBar'
import { HashRouter,Routes,Route } from 'react-router-dom'
import Home from "./component/Home"
import About from "./component/About"
import NoteState from './context/note/NoteState'

export default function App() {
  return (
    <>
    <NoteState>
    <HashRouter>
      <NavBar/>
      <div className='container my-2'>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/about" element={ <About/> } />
      </Routes>
      </div>
    </HashRouter>
          
    </NoteState>
    </>
  )
}
