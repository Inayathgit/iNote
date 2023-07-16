import React, { useContext, useState } from 'react'
import NoteContext from '../Context/NoteContext'
import { useEffect } from 'react'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context
    
    const[note,setnote] = useState({title:"",description:"",tag:""})
   const  handleclick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
   props.showAlert("Notes added successfully","success")
    // console.log(note.title)
    // console.log(note.description)
    // console.log(note.tag)
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]: e.target.value})
       
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add your note</h1>
      <form className = "my-3"> 
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"  name ="title" aria-describedby="emailHelp" onChange={onChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name ="description"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name ="tag"  onChange={onChange}/>
  </div>
  
  <button  disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
</form>
    </div>
    </div>
  )
}

export default AddNote
