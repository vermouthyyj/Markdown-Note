import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {

    /**
     * Lazily initialize our `notes` state so it doesn't
     * reach into localStorage on every single re-render
     * of the App component
     */
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])
    
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    React.useEffect(() => { 
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    /**
     * When the user edits a note, reposition
     * it in the list of notes to the top of the list
     */
    function updateNote(text) {
        setNotes(oldNotes => {
            // Create an empty note
            let tempNotes = []
            // Loop over the original array
            for (let i = 0; i < oldNotes.length; i++) {    
                // if the id matches
                if (oldNotes[i].id === currentNoteId) {
                    // put the udpated note at the beginning of the new array
                    tempNotes.unshift({ ...oldNotes[i], body: text })
                }
                // else
                else { 
                    // push the old note to the end of the new array
                    tempNotes.push(oldNotes[i])
                }
            }
            return tempNotes
        })
        // This does not rearrange the Notes
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text }
        //         : oldNote
        // }))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function deleteNote(event, noteId) { 
        event.stopPropagation()
        // console.log(event, noteId)
        // update note array
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
