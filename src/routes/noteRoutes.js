const express = require("express")
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController")
const auth = require("../middlewares/auth")
const noteRouter = express.Router()

/**
 * 1. Implementing all the routers for different controllers of Notes
 * 2. Adding middleware authentication for token
 * 
 * Here, the getNotes, createNote, deleteNote, updateNote are the next() functions of auth
 */ 

noteRouter.get("/", auth, getNotes)
noteRouter.post("/", auth, createNote)
noteRouter.delete("/:id", auth, deleteNote)
noteRouter.put("/:id", auth, updateNote)

module.exports = noteRouter