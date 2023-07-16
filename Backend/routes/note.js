const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const {
    body,
    validationResult
} = require('express-validator');


//ROUTE 1 : Create a get request to fetch all notes 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id
        })
        res.json(notes)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }

})

//ROUTE 2: create a post request to add note

router.post('/addnote', fetchuser, [

    body('title', 'Please enter a valid title').isLength({
        min: 3
    }),
    body('description', 'Please enter a valid description').isLength({
        min: 5
    }),
], async (req, res) => {
    //checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        title,
        description,
        tag
    } = req.body
    try {
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }

})

//Route3 : Create a Put request to update the notes

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {
        title,
        description,
        tag
    } = req.body
    try {
        
    

    const newNote = {};
    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }

    let  note = await Note.findById(req.params.id)
    if(!note){
        return res.status(401).send("Not found")
    }
    if(note.user &&note.user.toString() !== req.user.id){
       return  res.status(401).send("Not allowed")
    }

note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
res.json({note})
    }
catch (error) {
    return res.status(500).json("Internal server error")
        
}
})

//Route4 : Create a delete request to delete the notes

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {
        title,
        description,
        tag
    } = req.body
    try {

    let  note = await Note.findById(req.params.id)
    if(!note){
        return res.status(401).send("Not found")
    }
    if(note.user &&note.user.toString() !== req.user.id){
       return  res.status(401).send("Not allowed")
    }

note = await Note.findByIdAndDelete(req.params.id)
res.json({"Success": "Note has bee deleted" , note : note})
    }
catch (error) {
    console.log(error.message)
    return res.status(500).json("Internal server error")
        
}
})

module.exports = router