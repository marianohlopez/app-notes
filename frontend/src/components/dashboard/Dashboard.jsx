import NoteContainer from "../note-container/NoteContainer";
import { useContext } from "react";
import { Context } from "../../context/context";
import { Navigate } from 'react-router-dom';


const Dashboard = () => {

  /* const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }; */

  return (
    <div>
      <NoteContainer />
    </div>
  )
}

export default Dashboard
