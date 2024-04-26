//load environment variables
if (process.env.NODE_ENV != "production"){ // only done if env is dev or testing 
    require("dotenv").config();
}

//Dependencies
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/connectToDB');
const notesController = require("./controllers/notesController")
const usersController = require("./controllers/usersController")  

//create an express app
const app = express();
 
// configure express app
app.use(express.json());
app.use(cors());

//Connecting to Database
connectToDB();

//routing
app.get('/', (req, res) => {
    res.json({hello: "World"});
});
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/notes', notesController.fetchNotes);
app.get('/notes/:id', notesController.fetchNoteByID);
app.post('/notes', notesController.createNote);
app.put('/notes/:id', notesController.updateNote);
app.delete('/notes/:id', notesController.deleteNote);

//start server why you time out so much?!
app.listen(process.env.PORT);