import React, { useContext, useState} from 'react'
import NoteContext from '../context/note/NoteContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";

const Addnote = () => {
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const handelOnchange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const noteContext = useContext(NoteContext)
    const { addNote } = noteContext
    const handelSave = async (e) => {
        e.preventDefault();
        const success = await addNote(note);
        if (success) {
          navigate(-1);
        }
      }
      
    const handleCancel = () => { // Add this function
        navigate(-1); // Navigate back
      }
    return (
        <>
        <Button variant="primary" type="button" onClick={handleCancel}>
         <IoReturnUpBack/> Back
        </Button>
            <h1 className='text-center'>Create your note</h1>
            <Form>
                <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" minLength={5} required name='title' onChange={handelOnchange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} minLength={8} required  name='description' onChange={handelOnchange} />

                    <Form.Control className='mt-2' size="sm" type="text" name='tag' placeholder="tag(optional)" onChange={handelOnchange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handelSave}>
                    Save
                </Button>
            </Form>
        </>
    )
}

export default Addnote
