import NoteContainer from "../note-container/NoteContainer";
import { useContext } from "react";
import { Context } from "../../context/context";
import { Navigate } from 'react-router-dom';


const Dashboard = () => {

  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4 ml-12 sm:ml-auto">Notes</h2>
      <NoteContainer />
    </div>
  )
}

export default Dashboard
