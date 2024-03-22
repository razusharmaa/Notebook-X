import React, { useContext } from 'react'
import NoteContext from '../context/note/NoteContext'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const NoteItem = (props) => {
  const navigate = useNavigate();
  const noteContext = useContext(NoteContext)
  const { deleteNote } = noteContext

  const { notes } = props;
  const formattedTxt = (typ, n) => { return notes[typ].slice(0, n); }

   // for navigation and editing
   const handleEdit = () => {
    navigate('/note/editNote', { state: { note: notes } });
  }

  return (
    <Card style={{ height: '15rem' }}>
      <Card.Body>
        <Card.Title style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {notes.title}
        </Card.Title>
        <Card.Text>{formattedTxt('description', 40)}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {/* Display the date */}
        <small className="text-muted">{formattedTxt('date', 10)}</small>
        {/* Add the delete button here */}
        <Button onClick={handleEdit} variant="primary" size="sm" style={{ position: 'absolute', bottom: '3rem', left: '5px' }}>
          <FaEdit style={{ fontSize: '20px' }} />
        </Button>

        <Button onClick={() => deleteNote(notes._id)} variant="danger" size="sm" style={{ position: 'absolute', bottom: '3rem', left: '3rem' }}>
          <MdDeleteForever style={{ fontSize: '20px' }} />
        </Button>

      </Card.Footer>
    </Card>
  );
};

export default NoteItem;
