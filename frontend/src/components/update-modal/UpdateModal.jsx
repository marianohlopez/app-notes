import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';

const UpdateModal = ({ note, isOpen, setModalOpen }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    if (note) {
      setEditedNote(note);
    }
  }, [note]);
  
  const updateNote = async (updatedNote) => {
    const noteData = {
      title: updatedNote.title,
      description: updatedNote.description,
      date: updatedNote.date
    }
    try {
      const response = await axios.post(`${configParams.API_URL}/update-note/${updatedNote._id}`, 
      noteData, {withCredentials: true});
      console.log(response.data);
      alert("Note updated succesfully")
    }
    catch(err) {
      console.log(`Error updating note: ${err}`);
    }
  };

  const handleInputChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleNoteUpdate = () => {
    updateNote(editedNote);
    setModalOpen(false);
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={setModalOpen(false)}>
        {note && (
        <div>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={editedNote.description}
            onChange={handleInputChange}
          />
          <button onClick={handleNoteUpdate}>Guardar cambios</button>
        </div>
      )}
    </ReactModal>
  );
};

export default UpdateModal;