import { useEffect, useState } from "react";
import { getAllGames } from "../../Services/Games.js"
import { useNavigate } from "react-router-dom";
import GameList from "./MainList.jsx";

// Stateful parent Main 
const Main = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [locationFilter, setLocationFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAscending, setSortAscending] = useState(true);
    
    // Defensive coding: setIsLoaded to false so the child component
    // loads at the same time as the parent component 
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Navigate to the selected game's details page
    const handleSelectGame = (game) => {
    navigate(`/games/${game.id}`);
    };


  useEffect(() => {
    getAllGames().then((games) => {
      setGames(games);
      setIsLoaded(true);
    });
  }, []);


//   control for user filters and interaction 
  const filteredGames = games
  //    user filter on location 
    .filter((g) => locationFilter === "All" || g.location === locationFilter)
    //    user filter on opponent 
    .filter((g) =>
      g.opponent.toLowerCase().includes(searchTerm.toLowerCase())
    )
    //    user sort on date  
    .sort((a, b) =>
      sortAscending
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    // Future work: add more filters for season year and include results
    // from past games in the lists

  
return (
  <div>
    {isLoaded && (
      <>
        <h1>Notre Dame Football Schedule</h1>

        {/* User can input opponent */}
        <input
          type="text"
          placeholder="Search opponent..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* User can select home vs away vs all */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">All Games</option>
          <option value="Home">Home</option>
          <option value="Away">Away</option>
        </select>

        {/* User can sort by date */}
        <button onClick={() => setSortAscending(!sortAscending)}>
          Sort: {sortAscending ? "Earliest first" : "Latest first"}
        </button>

        <GameList
          games={filteredGames}
          onSelectGame={handleSelectGame}
        />
      </>
    )}
  </div>
);
}


export default Main;