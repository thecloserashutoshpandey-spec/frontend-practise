const addbtn = document.querySelector("#addbtn")
const container = document.querySelector(".notes-container");
const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach(note => createNote(note));
addbtn.onclick = function () {
    createNote("");
};
function createNote(text) {
    const note = document.createElement("div");
    note.classList.add("note");
    const textarea = document.createElement("textarea");
    textarea.value = text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("deleteBtn");
    note.appendChild(textarea);
    note.appendChild(delBtn);
    container.appendChild(note);
    textarea.addEventListener("input", saveNotes);
    delBtn.onclick = function () {
    note.remove();
    saveNotes();
  };
}
function saveNotes() {
  const allNotes = document.querySelectorAll("textarea");
  const data = [];

  allNotes.forEach(note => {
    data.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(data));
}
