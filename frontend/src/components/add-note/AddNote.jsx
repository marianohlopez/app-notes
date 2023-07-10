import { useState} from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import configParams from '../../config/config';

const AddNote = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const handleNoteSubmit = async (e) => {
      e.preventDefault();
      const noteData = {
        title: noteTitle,
        description: noteDescription,
        date: moment().format('DD/MM/YYYY, h:mm:ss a'),
      };
    
      try {
        const response = await axios.post(`${configParams.API_URL}/create-note`, noteData, 
        {withCredentials: true});
        setNoteTitle('');
        setNoteDescription('');
        setModalIsOpen(false);

        console.log(response.data);
        alert('Note created successfully');
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
      <div className="bg-gray-200 w-48 h-56 rounded-lg flex flex-col items-center justify-center">
        <div className="text-3xl w-20 h-20 rounded-full border-2 border-dotted border-blue-500 flex items-center justify-center text-blue-500">
            <button onClick={() => setModalIsOpen(true)}>+</button>
        </div>
        <p className="mt-2 text-center text-blue-500">Add new note</p>
      </div>
      <ReactModal
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '400px',
              maxHeight: '55vh',
              margin: '0 auto',
            },
          }}
        isOpen={modalIsOpen}               
        onRequestClose={() => setModalIsOpen(false)}
        >
        <form onSubmit={handleNoteSubmit} className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Add New Note</h2>
            <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 w-64"
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 w-64 h-40 resize-none"
            placeholder="Description"
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
            />
            <div className="flex justify-center">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="submit"
            >
                Submit
            </button>
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setModalIsOpen(false)}
            >
                Cancel
            </button>
            </div>
        </form>
      </ReactModal>
    </>
  )
}

export default AddNote
