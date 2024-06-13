
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import ListOfParticipants from "./ListOfParticipants";
import Register from "./Register";
import ParticipantsCard from "./ParticipantsCard";
import { getDatabase } from "./apiDatabase";
import { useEffect, useState } from "react";
import Download from "./Download";

function App() {
  const [participants, setParticipants] = useState([]);
  const [participantDataLoaded, setParticipantDataLoaded] = useState(false);

  useEffect(() => {
    getDatabase().then((fetchedData) => {
      setParticipants(fetchedData);
      setParticipantDataLoaded(true); // Set to true when data is fetched
    });
  }, []);

  const ParticipantCardWrapper = () => {
    const { id } = useParams();
    const participant = participants.find((emp) => emp.id === parseInt(id));
    if (!participantDataLoaded || !participant) {
      return <div>Loading...</div> // Show loading message until data is fetched or participant is found
    }
    return <ParticipantsCard participant={participant} />;
  };

  const DownloadCardWrapper = () => {
    const { id } = useParams();
    const participant = participants.find((emp) => emp.id === parseInt(id));
    if (!participantDataLoaded || !participant) {
      return <div>Loading...</div> // Show loading message until data is fetched or participant is found
    }
    return <Download participant={participant} />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="admin" element={<ListOfParticipants />} />
          <Route path="register" element={<Register />} />
          <Route
            path="participant/info/:id"
            element={<ParticipantCardWrapper />}
          />
          <Route path="participant/download/:id" element={<DownloadCardWrapper/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
