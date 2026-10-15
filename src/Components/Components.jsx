
import Main from "./Main/Main.jsx";
import GameDetails from "./GameDetails/GameDetails.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Defines the different modules of the application
export default function Components() {
  return (
    <Router>
      <Routes>
        {/* Route to the football schedule */}
        <Route path="/" element={<Main />} />

        {/* Route to the game details module */}
        <Route path="/games/:gameId" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}
