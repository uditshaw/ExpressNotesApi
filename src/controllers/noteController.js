const noteModel = require("../models/note")

/*
    4 functions to be implemented:-
    1. Create note
    2. Update note
    3. Delete note
    4. Get note
*/
const createNote = async (req, res) => {
    console.log("User id in createNote: " + req.userId);

    const {title, description} = req.body

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    })

    console.log(`New Note: ${newNote}`);

    try {
        await newNote.save()
        return res.status(201).json(newNote)
    } catch (error) {
        console.log("Cannot create new note: " + error);
        return res.status(500).json({message: "New note not created, exception occured"})
    }

}
const updateNote = async (req, res) => {
    console.log("User id in createNote: " + req.userId);

    const id = req.params.id
    const { title, description } = req.body

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {

        await noteModel.findByIdAndUpdate(id, newNote, {new: true})
        res.status(200).json(newNote)

    } catch (error) {
        console.log("Cannot update note: " + error);
        return res.status(500).json({message: "Cannot update note, exception occured"})
    }
    
}
const deleteNote = async (req, res) => {
    console.log("User id in createNote: " + req.userId);

    const id = req.params.id

    try {
        const note = await noteModel.findByIdAndDelete(id)
        res.status(202).json(note)
    } catch (error) {
        console.log("Cannot delete note: " + error);
        return res.status(500).json({message: "Cannot delete note, exception occured"})
    }
    
}
const getNotes = async (req, res) => {
    console.log("User id in createNote: " + req.userId);

    try {
        const notes = await noteModel.find({userId: req.userId})
        console.log(`Notes get request: ${notes}`);
        res.status(200).json(notes)
    } catch (error) {
        console.log("Cannot get notes: " + error);
        return res.status(500).json({message: "Cannot get notes, exception occured"})
    }
    
}

module.exports = {
    createNote, updateNote, deleteNote, getNotes
}