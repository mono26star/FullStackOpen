sequenceDiagram
    participant browser
    participant server
   
    Note right of browser: JavaScript code pushes new note to the end of note list and updates the file locally.

    Note right of browser: The browser rerenders the note list and sends the new note to the server.
        
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP Status code 201
    deactivate server