import { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ElementsToSerach from './ListPlayersComponents/ElementsToSerach'
import PlayersItem from './Interfaces/PlayersItem';
import { FilterPlayers, InformationType } from './Interfaces/FilterPlayers';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Edit,Thrash }  from '../icons/EditIcons'

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
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    function filterPlayers() {
        if (players !== undefined) {
            setPlayersInTable(players.filter((p, _) => ((playersFilter.club === '' ? p : p.current_club === playersFilter.club)
                && (playersFilter.position === '' ? p : p.position === playersFilter.position)
                && (playersFilter.name === '' ? p : p.full_name.toLowerCase().includes(playersFilter.name.toLowerCase())))));
        }

    }
    function addClubAndPositionToFilter() {
        if (players !== undefined) {
            const positions = [...new Set(players.map(player => player.position))];
            const clubs = [...new Set(players.map(player => player.current_club))];
            setInformation({ position: positions, club: clubs });
        }
    }
    function toggleEdit(rowId: number) {
        setEditingRowId(prev => (prev === rowId ? null : rowId));
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

    const contents1 = players === undefined ? <div></div> : <ElementsToSerach setPlayers={setPlayersFilter} InformationPlayers={information} playersFilter={playersFilter} />;


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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {playersInTable.map(player => (
                    <tr key={player.player_id}>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="number" value={player.number} />
                            ) : (
                                    player.number
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.full_name} />
                            ) : (
                                player.full_name
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.position} />
                            ) : (
                                player.position
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="number" value={player.age} />
                            ) : (
                                player.age
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.nationality} />
                            ) : (
                                player.nationality
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.current_club} />
                            ) : (
                                player.current_club
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.previous_club} />
                            ) : (
                                player.previous_club
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.market_value} />
                            ) : (
                                player.market_value
                            )}
                        </td>

                        <td>
                            {editingRowId === player.player_id ? (
                                <input type="text" value={player.height} />
                            ) : (
                                player.height
                            )}
                        </td>
                        <td>
                            <div className="d-flex">
                                <Button className="py-1 px-3" onClick={() => toggleEdit(player.player_id)}>
                                    {editingRowId === player.player_id ? 'Save' : <Edit />}
                                </Button>
                                <Button className="mx-2 py-1 px-3 bg-danger">
                                    <Thrash />
                                </Button>
                            </div>
                    </td>
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