import { createContext, useState } from 'react';
import axios from 'axios';
import configParams from '../config/config';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${configParams.API_URL}/get-notes`, { withCredentials: true });
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${configParams.API_URL}/delete-note/${id}`, { withCredentials: true })
      console.log(response.data);
      fetchNotes();
      alert("Nota eliminada correctamente")
    }
    catch(err) {
      console.log(`Error deleting the selected note: ${err}`);
    }
  }

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, fetchNotes, deleteNote, notes}}>
      {children}
    </Context.Provider>
  );
};