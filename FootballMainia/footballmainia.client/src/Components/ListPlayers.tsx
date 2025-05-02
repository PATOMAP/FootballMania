import { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ElementsToSerach from './ListPlayersComponents/ElementsToSerach'
import PlayersItem from './Interfaces/PlayersItem';
import { FilterPlayers, InformationType } from './Interfaces/FilterPlayers';

function ListPlayers() {
    const [players, setPlayers] = useState<PlayersItem[]>();
    const [playersInTable, setPlayersInTable] = useState<PlayersItem[]>();
    const [information, setInformation] = useState<InformationType>({
        position: [],
        club: [],
});
    const [playersFilter, setPlayersFilter] = useState<FilterPlayers>({
        name: '',
        club: '',
        position: ''
    }
    );

    function filterPlayers() {
        if (players !== undefined) {
            setPlayersInTable(players.filter((p, _) => ((playersFilter.club === '' ? p : p.current_club === playersFilter.club) && (playersFilter.position === '' ? p : p.position === playersFilter.position))));
            console.log(playersFilter);
        }

    }
    function addClubAndPositionToFilter() {
        if (players !== undefined) {
            const positions = [...new Set(players.map(player => player.position))];
            const clubs = [...new Set(players.map(player => player.current_club))];
            setInformation({ position: positions, club: clubs });
        }
    }


    useEffect(() => {
        populatePlayersData();
    }, []);
    useEffect(() => {
        addClubAndPositionToFilter();
    }, [players]);
    useEffect(() => {
        filterPlayers();
    }, [playersFilter]);

    const contents1 = players === undefined ? <div></div> : <ElementsToSerach setPlayers={setPlayersFilter} InformationPlayers={information} />;


    const contents = players === undefined || playersInTable === undefined
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
                {playersInTable.map(player => (
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
            {contents1 }
            <div>
                <h1 id="tableLabel">Players List</h1>
                <p>This component demonstrates fetching players data from the server.</p>
                {contents}
            </div>
        </div>

    );

    async function populatePlayersData() {
        const response = await fetch('playerslist'); // <-- tutaj zmieñ na twój backend endpoint!
        const data: PlayersItem[] = await response.json();
        setPlayersInTable(data);
        setPlayers(data);
        
    }
}

export default ListPlayers;