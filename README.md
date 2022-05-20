# Markdown-Note

Click here to access the _[Markdown Note](https://vermouthyyj.github.io/Markdown-Note/)_.

App Component Structure
notes: lazily initialized the notes state

![avatar](/img/struct.png)
Key Features

1. Keep Notes even though refresh the webpage (sync notes with localStorage)
2. Show note titles in the sidebar (Add note summary titles)
3. Keep the most recent modified note at the top of the sidebar (Move modified notes to the top of the list)
4. Delete notes

Methods

1.  Lazily initialize our `notes` state so it doesn't reach into localStorage on every single re-render of the App component
    `const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])`
2.  display only the first line of note.body as the note summary in the sidebar.
    - note.body has "invisible" newline characters
      in the text every time there's a new line shown. E.g.
      the text in Note 1 is:
      "# Note summary\n\nBeginning of the note"
    - See if you can split the string into an array
      using the "\n" newline character as the divider
3.  When the user edits a note, reposition it in the list of notes to the top of the list
