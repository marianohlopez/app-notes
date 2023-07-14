import { useEffect, useState, useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import AddNote from '../add-note/AddNote';
import { Context } from '../../context/context';
import UpdateModal from '../update-modal/UpdateModal';

const NoteContainer = () => {

  const {fetchNotes, deleteNote, notes} = useContext(Context);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddNote fetchNotes={fetchNotes} />
        {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow rounded-lg p-4 h-56 w-3/4 sm:w-full mx-auto"
          onClick={() => {handleNoteClick(note)}}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold mb-2">{note.title}</h3>
              <p>{note.description}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-300">
              <p className="text-sm text-gray-500">{note.date}</p>
              <FaTrashAlt className='text-gray-500 hover:text-black cursor-pointer' title='Delete'
              onClick={() => deleteNote(note._id)} />
            </div>
          </div>
        </div>
        ))}
      </div>
      {selectedNote &&
        <UpdateModal note={selectedNote} isOpen={modalOpen} setModalOpen={setModalOpen} />
      }
      
    </div>
  );
};

export default NoteContainer;