const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser')
const Notes = require('../models/Notebook')
const { body, validationResult } = require('express-validator')

// Route 1 : Get all the note using : Get "/api/note/fetchallnotes" , Login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes= await Notes.find({user:req.user.id});
    res.json(notes)
  } catch (error) {
    res.status(500).send("Some error occurred")
  }
})

// Route 2 : Add a new note using : POST "/api/note/addnotes" , Login require
router.post('/addnote', fetchuser, [
  body('title','Enter a valid Title').isLength({ min: 3 }),
  body('description','description length must be minimum 8 letter').isLength({ min: 8 }),
], async (req, res) => {
  try {
    const {title, description, tag} = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(400).json({ error: errorMessage });
    }
    const note = new Notes({
      user: req.user.id, title, description, tag
    })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    res.status(503).send(error)
  }
})

// Route 3 : Update an existing note using : PUT "/api/note/updatenote/:id" , Login require
router.put('/updatenote/:id', fetchuser, [
  body('title','Enter a valid Title').isLength({ min: 3 }),
  body('description','description length must be minimum 8 letter').isLength({ min: 8 }),
], async (req, res) => {
  const {title,description,tag}=req.body;
  // Create a new note
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(400).json({ error: errorMessage });
    }
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // Find the note to be updated & update it
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send({"error": "Not Found"});}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send({"error": "You are not authorized to update this note"});
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note});
  } catch (error) {
    res.status(503).send(error)
  }
})



// Route 4 : Delete an existing note using : DELETE "/api/note/updatenote/:id" , Login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
  // Find the note to be updated & update it
  let note = await Notes.findById(req.params.id)
  if(!note){return res.status(404).send({"error": "Not Found"});}
  // check for authorization
  if(note.user.toString() !== req.user.id){
    return res.status(401).send({"error": "You are not authorized to update this note"});
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"success":"sucessfully deleted", note:note});
} catch (error) {
  res.status(503).send(error)
}
})


module.exports = router
