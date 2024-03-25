import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/note/NoteContext'
import NoteItem from './NoteItem'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function Note() {
    const navigate = useNavigate();
    const noteContext = useContext(NoteContext)
    const { notes,getNote } = noteContext

    const editNote=(id)=>{

    }

// In Note.js
useEffect(() => {
  if(localStorage.getItem('token')){
    getNote();
  }
  else{
    navigate('/login');
  }
  // eslint-disable-next-line
}, [localStorage.getItem('token')]);


// for navigation and editing
   const handleAddNote = () => {
    navigate('/note/createNote');
  }

    return (
        <>
        <div>
        <ButtonGroup  style={{width:"100%",height:"100px"}} size="lg" className="mb-2 text-center d-flex align-items-center justify-content-center">
        <Button onClick={handleAddNote} style={{width:"100%",height:"100%"}} ><FaPlus style={{paddingRight:"10px"}}/>New Note</Button>
      </ButtonGroup>
            <h2>Your Notes</h2>
           <div> {notes.length===0 && "No notes to show"} </div>
            <div>
                <Row xs={2} md={4} className="g-4">
                {
                    notes.map((notes) => {
                        return (
                        <Col key={notes._id} >
                            <NoteItem notes={notes} editNote={editNote} />
                        </Col>
                        )
                    })
                }
                </Row>
            </div>
        </div>
        </>
    )
}

export default Note
