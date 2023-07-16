import React from 'react'
import Notes from './Notes'
import NoteContext from '../Context/NoteContext'
import {useContext } from 'react'
const NotesItem = (props) => {
const{note,updatenote} = props
const noteContext = useContext(NoteContext)
const{deleteNote} = noteContext

  return (
    <div className="col-md-3 my-3">
   

      <div className="card" style={{width: "18rem"}}>
         <div className="card-body">
         <h5 className="card-title"> {note.title}</h5>
         <p className="card-text">{note.description}</p>
         <i className="fa-solid fa-trash mx-2" onClick={()=>{
            deleteNote(note._id)
            props.showAlert("Notes deleted successfully","success")
         }}></i>
         <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
          updatenote(note)
         }}></i>
         
         </div>
       </div>
       </div>
    
  )
}

export default NotesItem
