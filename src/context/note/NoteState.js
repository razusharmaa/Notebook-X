import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialNote =[
        {
          "_id": "65eee5e13894c3fe2bf3ae91",
          "user": "65e5396ade098a8dc609ca94",
          "title": "ajdshn note",
          "description": "my 1st description",
          "tag": "whats tag",
          "date": "2024-03-11T11:07:13.978Z",
          "__v": 0
        },
        {
          "_id": "65f29152c9a7323fb22a6123",
          "user": "65e5396ade098a8dc609ca94",
          "title": " My dream",
          "description": "there is nothing special in mine dream , ...",
          "tag": " omg",
          "date": "2024-03-14T05:55:30.356Z",
          "__v": 0
        },
        {
          "_id": "65eee8713894c3fe2bf3ae91",
          "user": "65e5396ade098a8dc609ca94",
          "title": "poooo tasty",
          "description": "fav food",
          "tag": "whats tag",
          "date": "2024-03-11T11:07:13.978Z",
          "__v": 0
        },
        {
          "_id": "659399152c9a7323fb22a6123",
          "user": "65e5396ade098a8dc609ca94",
          "title": " My hucnjd",
          "description": "there blahin mine dream , ...",
          "tag": " omg",
          "date": "2024-03-14T05:55:30.356Z",
          "__v": 0
        }
      ]
    const [note, setNote] = useState(initialNote);

    return (
        <NoteContext.Provider value={{note,setNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
