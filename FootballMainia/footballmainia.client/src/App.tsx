import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PlayersItem {
    player_id: number;
    number: number;
    full_name: string;
    position: string;
    age: number;
    nationality: string;
    current_club: string;
    previous_club: string;
    market_value: string;
    height: string;
}

function App() {
    const [players, setPlayers] = useState<PlayersItem[]>();

    useEffect(() => {
        populatePlayersData();
    }, []);

    const contents = players === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Position</th>
                    <th>Age</th>
                    <th>Nationality</th>
                    <th>Current Club</th>
                    <th>Previous Club</th>
                    <th>Market Value</th>
                    <th>Height</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => (
                    <tr key={player.player_id}>
                        <td>{player.number}</td>
                        <td>{player.full_name}</td>
                        <td>{player.position}</td>
                        <td>{player.age}</td>
                        <td>{player.nationality}</td>
                        <td>{player.current_club}</td>
                        <td>{player.previous_club}</td>
                        <td>{player.market_value}</td>
                        <td>{player.height}</td>
                    </tr>
                ))}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Players List</h1>
            <p>This component demonstrates fetching players data from the server.</p>
            {contents}
        </div>
    );

    async function populatePlayersData() {
        const response = await fetch('playerslist'); // <-- tutaj zmieñ na twój backend endpoint!
        const data: PlayersItem[] = await response.json();
        setPlayers(data);
    }
}

export default App;
