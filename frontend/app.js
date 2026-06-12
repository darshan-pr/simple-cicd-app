const API_BASE = "/api";

async function createNote() {

    const title =
    document.getElementById("title").value;

    const content =
    document.getElementById("content").value;

    if(!title || !content){
        alert("Fill all fields");
        return;
    }

    await fetch(`${API_BASE}/notes`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            content
        })
    });

    document.getElementById("title").value="";
    document.getElementById("content").value="";

    loadNotes();
}

async function deleteNote(id){

    await fetch(
        `${API_BASE}/notes/${id}`,
        {
            method:"DELETE"
        }
    );

    loadNotes();
}

async function loadNotes(){

    const response =
    await fetch(`${API_BASE}/notes`);

    const notes =
    await response.json();

    const notesDiv =
    document.getElementById("notes");

    notesDiv.innerHTML="";

    notes.forEach(note=>{

        notesDiv.innerHTML += `
        <div class="note">
            <h3>${note.title}</h3>
            <p>${note.content}</p>

            <button
            class="delete-btn"
            onclick="deleteNote(${note.id})">
            Delete
            </button>
        </div>
        `;
    });
}

loadNotes();