const Note = require("../models/note");

const fetchNotes = async (req, res) => {
    const notes = await Note.find();            //find notes
    res.json({notes: notes});                   //respond with them
};

const fetchNoteByID = async (req, res) => {
    const noteID = req.params.id;               // get id off URL
    const note = await Note.findById(noteID);   // find note with id
    res.json({note: note});                     // return note
};

const createNote = async (req, res) => {
    const title = req.body.title;               // get sent in data off request body
    const body = req.body.body;
    const note = await Note.create({            // create note with in
        title: title,
        body: body,
    });
    res.json({note: note});
};

const updateNote = async (req, res) => {
    const noteID = req.params.id;
    const title = req.body.title;               // fetch data off request body
    const body = req.body.body;
    await Note.findByIdAndUpdate(noteID, {      // Find and Update Record
        title: title,
        body: body,
    });
    const note = await Note.findById(noteID);
    res.json({note: note})                      // Respoonse
};

const deleteNote =  async (req, res) => {
    const noteID = req.params.id;               //Get ID off URL
    await Note.deleteOne({_id: noteID});         // Delete record
    res.json({success: "Record Deleted"});
};

module.exports = {
    fetchNotes: fetchNotes,
    fetchNoteByID: fetchNoteByID,
    createNote: createNote,
    updateNote: updateNote, 
    deleteNote: deleteNote, 
}