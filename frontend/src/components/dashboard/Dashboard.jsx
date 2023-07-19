import NoteContainer from "../note-container/NoteContainer";
import { useContext } from "react";
import { Context } from "../../context/context";
import { Navigate } from 'react-router-dom';
import SearchBar from "../search-bar/SearchBar";
import Logout from "../logout/Logout";


const Dashboard = () => {

  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container flex flex-col mx-auto py-4">
      <div className="flex items-center justify-between text-2xl w-3/4 sm:w-full font-bold mb-4 mx-auto">
        <h2>Notes</h2>
        <Logout />
      </div>
      <SearchBar />
      <NoteContainer />
    </div>
  )
}

export default Dashboard
