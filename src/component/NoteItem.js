import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const NoteItem = (props) => {
    const {note}=props;
  return (
       <Card >
       <Card.Body>
         <Card.Title>{note.title}</Card.Title>
         <Card.Text>
         {note.description}
         </Card.Text>
         <Button variant="primary">Open</Button>
       </Card.Body>
       <Card.Footer>
          <small className="text-muted">{note.tag}</small>
        </Card.Footer>
     </Card>
  )
}

export default NoteItem
