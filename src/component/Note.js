import React, { useContext } from 'react'
import NoteContext from '../context/note/NoteContext'
import NoteItem from './NoteItem'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Note() {
    const noteContext = useContext(NoteContext)
    const { note, setNote } = noteContext
    return (
        <div>
            <h2>Your Notes</h2>
            <div>
                <Row xs={2} md={4} className="g-4">
                {
                    note.map((note) => {
                        return (
                        <Col key={note._id} >
                            <NoteItem note={note} />
                        </Col>
                        )
                    })
                }
                </Row>
            </div>
        </div>
    )
}

export default Note
