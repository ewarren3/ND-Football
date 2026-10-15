
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllGames } from "../../Services/Games.js";

function GameDetails() {
    // Get the game ID from URL
    const navigate = useNavigate();
    const { gameId } = useParams();

    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get all games from our custom service
        getAllGames()
            .then((games) => {
                // Find the game matching the URL parameter
                const selectedGame = games.find(
                    (game) => String(game.id) === gameId
                );

                setGame(selectedGame || null);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load game details:", error);
                setError("Unable to load game details.");
                setIsLoading(false);
            });
    }, [gameId]);

    // Wait until the data finishes loading
    if (isLoading) {
        return <p>Loading game details...</p>;
    }

    // Show message if the request failed
    if (error) {
        return <p>{error}</p>;
    }

    // Handle an invalid game ID
    if (!game) {
        return <p>Game not found.</p>;
    }

    return (
        <div>
            <h1>Game Details</h1>

            <h2>Notre Dame vs. {game.opponent}</h2>

            <p>Date: {game.date}</p>
            <p>Location: {game.location}</p>

            <button onClick={() => navigate("/")}>
                Back to Schedule
            </button>
        </div>
    );
}

export default GameDetails;
