import {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: '',
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null, 
    title: '',
    body: '',
  });
  
  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:3000/notes');   //fetch notes
    setNotes(res.data.notes);
    console.log(res);                                             //set to state
  }; 

  const updateCreateFormField = (event) => {
    const {name, value} = event.target;
    setCreateForm({
      ...createForm,
      [name]: value,  
    })
  };

  const createNote = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:3000/notes", createForm) // create note
    setNotes([...notes, res.data.note]);                                    // update state
    setCreateForm({title: "", body: ""});                                   // clear form state
  };

  const deleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${_id}` ); // delete note
    const newNotes = [...notes].filter(note => {
      return note._id !== _id;
    });                                                                    // create an identical array of notes except the id that has been passed
    setNotes(newNotes)                                                     // update state
  };

  const toggleUpdate = (note) => {
    setUpdateForm({title: note.title, body: note.body, _id: note._id});//get current note values
    //set state on update form
  }

  const handleUpdateFieldChange = (event) => {
    const {value, name} = event.target;
    setUpdateForm({
      ...updateForm, 
      [name]: value,
    });
  };

  const updateNote = async (event) => {
    event.preventDefault();
    const {title, body} = updateForm;
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {title, body})//send update request
    const newNotes = [...notes]; //update state
    const noteIndex = notes.findIndex(note => {
      return note._id == updateForm._id;
    })
    newNotes[noteIndex] = res.data.note;
    setNotes(newNotes);
    setUpdateForm({
      _id: null, 
      title: "",
      body: "",
    });
  };

  return (
    <div className="App">
      <div>
        <h2>Notes: </h2>
        {notes && notes.map(note => {
          return (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>Delete Note</button>
              <button onClick={() =>toggleUpdate(note)}>Update Note</button>
            </div>
          );
        })}
      </div>

      {updateForm._id && (
      <div>
        <h2>Update note</h2>
        <form onSubmit={updateNote}>
          <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title"/>
          <br />
          <br />
          <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body" rows={4} cols={40}/>
          <button type="submit">Update Note</button>
        </form>
      </div>)}

      {!updateForm._id && (<div>
        <h2>Create Note: </h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} value={createForm.title} name="title" />
          <br />
          <br />
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body" rows={4} cols={40}/>
          <button type="submit">Create Note!</button>
        </form>
      </div>)}
    </div>
  );
}

export default App;
