import ReactModal from 'react-modal';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context/context';
import axios from 'axios';
import configParams from '../../config/config';

const UpdateModal = ({ note, isOpen, setModalOpen }) => {
  const [editedNote, setEditedNote] = useState(note);
  const {fetchNotes} = useContext(Context);

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
      fetchNotes()
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
    <ReactModal isOpen={isOpen} onRequestClose={() => setModalOpen(false)}>
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