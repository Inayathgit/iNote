import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []

    const getNotes = async () => {

        //API Call
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json()
        Setnotes(json)
    }





    const [notes, Setnotes] = useState(notesInitial)
    //To add note
    const addNote = async (title, description, tag) => {
        //Api Call
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();

        // const note = {
        //     "_id": "64856e600b76a89b555099a6",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "__v": 0
        // }
        Setnotes(notes.concat(note))
        // console.log(title)
        // console.log(description)
        // console.log(tag)
    }



    const editNote = async (id, title, description, tag) => {


        //Api Call
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        const newNote = JSON.parse(JSON.stringify(notes))
        //editing a Note 
        for (let index = 0; index < notes.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
           
            
        }
        Setnotes(newNote)

    }





    //To delete note

    const deleteNote = async (id) => {
       
        const NewNote = notes.filter((note) => {
            return note._id !== id

        })
        Setnotes(NewNote)
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },


        });
        return response.json();


    }

    return (
        <div>
            <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )

}
export default NoteState





