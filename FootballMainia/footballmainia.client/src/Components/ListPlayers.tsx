import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ElementsToSerach from './ListPlayersComponents/ElementsToSerach'
import PlayersItem from './Interfaces/PlayersItem';
import { FilterPlayers, InformationType } from './Interfaces/FilterPlayers';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Edit,Thrash }  from '../icons/EditIcons'
import AddItemPlayer from './ListPlayersComponents/AddItemToPlayer'
import '../styleCss/ListPlayerStyle.css';
function ListPlayers() {
    const [players, setPlayers] = useState<PlayersItem[]>([]);
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
    const [editingRowId, setEditingRowId] = useState<number | null>(null);//editingRow
    const [editingPlayerData, setEditingPlayerData] = useState<PlayersItem | null>(null);//actualPlayerEditing
    function filterPlayers() {
        if (players !== undefined) {
            setPlayersInTable(players.filter((p, _) => ((playersFilter.club === '' ? p : p.current_club === playersFilter.club)
                && (playersFilter.position === '' ? p : p.position === playersFilter.position)
                && (playersFilter.name === '' ? p : p.full_name.toLowerCase().includes(playersFilter.name.toLowerCase())))));
        }

    }
    function toggleEdit(rowId: number) {
        if (editingRowId === rowId) {
    
            if (editingPlayerData) {
                setPlayersInTable(prev =>
                    prev?.map(p => p.player_id === rowId ? editingPlayerData : p)
                );
                setPlayers(prev =>
                    prev?.map(p => p.player_id === rowId ? editingPlayerData : p)
                );
            }
             if (editingPlayerData !== null)
             savePlayer(editingPlayerData);
        
            setEditingRowId(null);
            setEditingPlayerData(null);

           
        }
        else {
            const playerToEdit = playersInTable?.find(p => p.player_id === rowId);
            if (playerToEdit) {
                setEditingRowId(rowId);
                setEditingPlayerData({ ...playerToEdit });
            }
        }
    }
    function deletePlayerB(key: number)
    {
        const playerToDelete = playersInTable?.find(p => p.player_id === key);
        if (playerToDelete === undefined) return;
        deletePlayer(playerToDelete);
        console.log(playerToDelete);
    }
    function handleFieldChange(field: keyof PlayersItem, value: string | number) {
        setEditingPlayerData(p =>
            p ? { ...p, [field]: value } : null
        );
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
    }, [playersFilter, players]);

    const contents1 = players === undefined ? <div></div> : <div><AddItemPlayer source={information} players={players} setPlayers={setPlayers} /><ElementsToSerach setPlayers={setPlayersFilter} InformationPlayers={information} playersFilter={playersFilter} /></div>;


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
                                <input
                                    type="number"
                                    value={editingPlayerData?.number || ''}
                                    onChange={(e) => handleFieldChange('number', +e.target.value)}
                                />
                            ) : (
                                player.number
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.full_name || ''}
                                    onChange={(e) => handleFieldChange('full_name', e.target.value)}
                                />
                            ) : (
                                player.full_name
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.position || ''}
                                    onChange={(e) => handleFieldChange('position', e.target.value)}
                                />
                            ) : (
                                player.position
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="number"
                                    value={editingPlayerData?.age || ''}
                                    onChange={(e) => handleFieldChange('age', +e.target.value)}
                                />
                            ) : (
                                player.age
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.nationality || ''}
                                    onChange={(e) => handleFieldChange('nationality', e.target.value)}
                                />
                            ) : (
                                player.nationality
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.current_club || ''}
                                    onChange={(e) => handleFieldChange('current_club', e.target.value)}
                                />
                            ) : (
                                player.current_club
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.previous_club || ''}
                                    onChange={(e) => handleFieldChange('previous_club', e.target.value)}
                                />
                            ) : (
                                player.previous_club
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.market_value || ''}
                                    onChange={(e) => handleFieldChange('market_value', e.target.value)}
                                />
                            ) : (
                                player.market_value
                            )}
                        </td>
                        <td>
                            {editingRowId === player.player_id ? (
                                <input
                                    type="text"
                                    value={editingPlayerData?.height || ''}
                                    onChange={(e) => handleFieldChange('height', e.target.value)}
                                />
                            ) : (
                                player.height
                            )}
                        </td>
                        <td>
                            <div className="d-flex">
                                <Button className="py-1 px-3" onClick={() => toggleEdit(player.player_id)}>
                                    {editingRowId === player.player_id ? 'Save' : <Edit />}
                                </Button>
                                <Button onClick={() => deletePlayerB(player.player_id) } className="mx-2 py-1 px-3 bg-danger">
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
    async function savePlayer(player: PlayersItem) {
        const response = await fetch('playerslist/savePlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        });

        const resultText = await response.text();

        if (!response.ok) {
            console.error("B³¹d zapisu:", resultText);
        } else {
            console.log("Sukces:", resultText);
        }
    }
}

async function deletePlayer(player: PlayersItem) {
    const response = await fetch('playerslist/deletePlayer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    });

    const resultText = await response.text();

    if (!response.ok) {
        console.error("B³¹d zapisu:", resultText);
    } else {
        console.log("Sukces:", resultText);
    }
}


export default ListPlayers;