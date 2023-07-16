import React from 'react'
import NotesItem from './NotesItem'
import { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import NoteContext from '../Context/NoteContext'
const Notes = (props) => {
  const navigate = useNavigate();
  const noteContext = useContext(NoteContext)
  const { notes, getNotes, editNote } = noteContext
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      navigate('/login')
    }
  }, []);
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const ref = useRef(null)
  const refclose = useRef(null)

  const updatenote = (currentnote) => {
    ref.current.click()
    setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })


  }
  const handleclick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    console.log("updating the note", note)
    refclose.current.click()
    props.showAlert("Notes updated successfully", "success")


  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })

  }

  return (

    <>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" v aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleclick}>update Note</button>
            </div>

          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Note </h1>
        <div className="container">
          {notes.length === 0 ? 'No notes to display' : ''}
        </div>
        {notes.map((note) => {
          return <NotesItem key={note._id} showAlert={props.showAlert} updatenote={updatenote} note={note} />
        })
        }
      </div>
    </>
  )
}

export default Notes
