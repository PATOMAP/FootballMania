import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ElementsToSerach from './ListPlayersComponents/ElementsToSerach'
import PlayersItem from './Interfaces/PlayersItem';
import { InformationType } from './Interfaces/FilterPlayers';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Edit,Thrash }  from '../icons/EditIcons'
import AddItemPlayer from './ListPlayersComponents/AddItemToPlayer'
import '../styleCss/ListPlayerStyle.css';
import OperationWithPlayers from '../Components/ListPlayersComponents/OperationWithPlayers'
import ActuallyFilter from './ListPlayersComponents/ActuallyFilter'
function ListPlayers() {
    const { deletePlayer, toggleEdit, filterPlayers, playersInTable, populatePlayersData, setEditingPlayerData, editingPlayerData, players, addPlayer, setPlayersFilter, playersFilter,editingRowId } = OperationWithPlayers();
    const [information, setInformation] = useState<InformationType>({
        position: [],
        club: [],
});


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
    }, [populatePlayersData]);
    useEffect(() => {
        addClubAndPositionToFilter();
    }, [players]);
    useEffect(() => {
        filterPlayers();
    }, [playersFilter, players]);

    const contents1 = players === undefined ? <div></div> : <div><AddItemPlayer source={information} addPlayer={addPlayer} /> <ActuallyFilter playersFilter={playersFilter} setPlayers={setPlayersFilter}/><ElementsToSerach setPlayers={setPlayersFilter} InformationPlayers={information} playersFilter={playersFilter} /></div>;


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
                                    className="form-control form-size col-1"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                    className="form-control form-size"
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
                                <Button onClick={() => deletePlayer(player.player_id) } className="mx-2 py-1 px-3 bg-danger">
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



}




export default ListPlayers;