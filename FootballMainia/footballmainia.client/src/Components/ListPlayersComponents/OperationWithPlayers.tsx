import { useState, useCallback } from "react";
import PlayersItem from "../Interfaces/PlayersItem";
import { FilterPlayers, PlayerCreateDto } from "../Interfaces/FilterPlayers"; 

function OperationWithPlayers() {
    const [players, setPlayers] = useState<PlayersItem[]>([]);
    const [playersInTable, setPlayersInTable] = useState<PlayersItem[]>();
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


    const populatePlayersData = useCallback(async () => {
        const response = await fetch('playerslist/getAllPlayers'); // <-- tutaj zmieñ na twój backend endpoint!
        const data: PlayersItem[] = await response.json();
        setPlayersInTable(data);
        setPlayers(data);

    }, []);
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

        const savePlayer = useCallback(async (player: PlayersItem) => {

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
        },[])

    const deletePlayer = useCallback(async (key: number) => { 
        const playerToDelete = playersInTable?.find(p => p.player_id === key);
        if (playerToDelete === undefined) return;
        const response = await fetch('playerslist/deletePlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerToDelete),
        });

        const resultText = await response.text();

        if (!response.ok) {
            console.error("B³¹d zapisu:", resultText);
        } else {
            console.log("Sukces:", resultText);
            populatePlayersData();

        }
    }, [players]);
    const addPlayer = useCallback(async (playersAdd: PlayerCreateDto) => {

        if (players === undefined || setPlayers === undefined) return;
        const { number, full_name, position, age, nationality, current_club, previous_club, market_value, height } = playersAdd;
        if (
            number === 0 ||
            full_name.trim() === '' ||
            position.trim() === '' ||
            age === 0 ||
            nationality.trim() === '' ||
            current_club.trim() === '' ||
            previous_club.trim() === '' ||
            market_value.trim() === '' ||
            height.trim() === ''
        ) {
            alert('Please fill in all fields before adding the player.');
            return;
        }
        if (players.some(p => p.number === playersAdd.number)) {
            alert('Player with this number already exists.');
            return;

        }

        const response = await fetch('playerslist/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playersAdd),
        });
        const resultText = await response.text();

        if (!response.ok) {
            console.error("B³¹d zapisu:", resultText);
        } else {

            console.log("Sukces:", resultText);
            populatePlayersData();
            playersAdd.number = 0;
            playersAdd.full_name= '';
            playersAdd.position = '';
            playersAdd.age = 0 ;
            playersAdd.nationality= '';
            playersAdd.current_club = '';
            playersAdd.previous_club = '';
            playersAdd.market_value ='';
            playersAdd.height = '';

        }
    }, [populatePlayersData])
    return ({ populatePlayersData, players, playersInTable, filterPlayers, toggleEdit, deletePlayer, setPlayersFilter, addPlayer, setEditingPlayerData, editingPlayerData, playersFilter,editingRowId })
}

export default OperationWithPlayers;