import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Notes(){
    const [content, setContent] = useState("")
    const [notes, setNotes] = useState([])

    const getNotes = async () =>{
        try {
            const response = await axios.get(
                "http://localhost:5000/notes/get"
            )
            setNotes(response.data.notes)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() =>{
        getNotes()
    }, [])

    const addNotes = async (e) =>{
        e.preventDefault()

        try {
            await axios.post(
                "http://localhost:5000/notes/create", {content}
            )
            setContent("")
            getNotes()
        } catch (error) {
            console.log(error);
            
        }
    }

    const deleteNotes = async (id) =>{
        try {
            await axios.delete(
                `http://localhost:5000/notes/delete/${id}`
            )
            getNotes()
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <div>
                <h1>Notes App</h1>
                <form onSubmit={addNotes}>
                    <textarea id="note" value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your notes here " rows="5" 
                        ></textarea>

                        <button type="submit" >Add notes</button>
                </form>
            
              <div>
                    {notes.length === 0 ? (
                        <p>
                            No notes yet. Add your first note!
                        </p>
                    ) : (
                        notes.map((note) => (
                            <div
                                key={note._id}
                                
                            >
                                <p >
                                    {note.content}
                                </p>

                                <button
                                    onClick={() => deleteNotes(note._id)}
                                   
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
                

            </div>
        </div>
    )
}

export default Notes