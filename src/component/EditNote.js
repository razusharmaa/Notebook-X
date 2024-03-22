import React, { useContext, useState } from 'react'
import NoteContext from '../context/note/NoteContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';

const EditNote = (props) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const noteContext = useContext(NoteContext)

  // Initialize state with note data from location state if it exists
  const [note, setNote] = useState(location.state ? location.state.note : { title: '', description: '', tag: '' });

  const handelOnchange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const handelSave = async (e) => {
    e.preventDefault();
    const success = await noteContext.editNote(note._id, note.title, note.description, note.tag);
    if (success) {
      navigate(-1);
    }
  }
  

  const handleCancel = () => { // Add this function
    navigate(-1); // Navigate back
  }
  return (
    <>
 

      <h3 className='text-center'>Update your Note</h3>
            <Form>
                <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={note.title} name='title' onChange={handelOnchange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} value={note.description} name='description' onChange={handelOnchange} />

                    <Form.Control className='mt-2' size="sm" type="text" value={note.tag} name='tag' placeholder="tag(optional)" onChange={handelOnchange} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleCancel}>
          Cancel
        </Button>
                <Button className='mx-4' variant="success" type="submit" onClick={handelSave}>
                    Save
                </Button>
            </Form>

    </>
  )
}

export default EditNote;
