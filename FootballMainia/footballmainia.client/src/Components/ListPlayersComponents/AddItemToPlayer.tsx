import { InformationType,PlayerCreateDto } from '../Interfaces/FilterPlayers'
import PlayersItem from '../Interfaces/PlayersItem';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
type InformationPlayer = {
    source: InformationType;
    setPlayers: React.Dispatch<React.SetStateAction<PlayersItem[]>> | undefined;
    players: PlayersItem[] | undefined;
}

const AddPlayerToDatabase: React.FC<InformationPlayer> = ({ source, setPlayers, players }) => {
    const [playersAdd, setPlayerAdd] = useState<PlayersItem>({
        age: 0, current_club: '', full_name: '', height: '', market_value: '', nationality: '', number: 0, player_id:0, position: '', previous_club: ''
    });
    function handleFieldChange(field: keyof PlayersItem, value: string | number) {
        setPlayerAdd(p =>  ({ ...p, [field]: value }));
    }
    const [open, setOpen] = useState(false);
    async function addPlayer() {
        if (players === undefined || setPlayers === undefined) return;
        const { number, full_name, position, age, nationality, current_club, previous_club, market_value, height } = playersAdd;
        playersAdd.player_id = players.length + 1; 
        const itemToAdd = mapToCreateDto(playersAdd);
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
        setPlayers(p=>[...p, playersAdd]); // Add the new player to the list)
        const response= await fetch('playerslist/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToAdd),
         });
        const resultText = await response.text();

        if (!response.ok) {
            console.error("B³¹d zapisu:", resultText);
        } else {
            console.log("Sukces:", resultText);
        }
    }

    function mapToCreateDto(player: PlayersItem): PlayerCreateDto {
        return {
            number: player.number,
            full_name: player.full_name,
            position: player.position,
            age: player.age,
            nationality: player.nationality,
            current_club: player.current_club,
            previous_club: player.previous_club,
            market_value: player.market_value,
            height: player.height
        };
    }
    return (
        <div className="mt-2">
            <label className="mx-2">Add Player:</label>
            <Button
                variant="dark"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-addPlayer"
                aria-expanded={open}
                className="rounded-circle align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
            >
                {open ? '-' : '+'}
            </Button>
            <Collapse in={open}>
            <div>
                    <div className="container my-4">
                    <div className="w-100" style={{ maxWidth: '1000px' }}>
                        <div className="row g-3">

                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Numer</label>
                                <input
                                    type="number"
                                    className="form-control form-size"
                                    value={playersAdd.number}
                                    onChange={(e) => handleFieldChange('number', +e.target.value)}
                                />
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Full name</label>
                                <input
                                    type="text"
                                    className="form-control form-size"
                                    value={playersAdd.full_name}
                                    onChange={(e) => handleFieldChange('full_name', e.target.value)}
                                />
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Position</label>
                                <select
                                    className="form-control form-size"
                                    value={playersAdd.position}
                                    onChange={(e) => handleFieldChange('position', e.target.value)}
                                >
                                    <option value="">Select position</option>
                                    {source.position.map((pos, index) => (
                                        <option key={index} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control form-size"
                                    value={playersAdd.age}
                                    onChange={(e) => handleFieldChange('age', +e.target.value)}
                                />
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Nationality</label>
                                <input
                                    type="text"
                                    className="form-control form-size"
                                    value={playersAdd.nationality}
                                    onChange={(e) => handleFieldChange('nationality', e.target.value)}
                                />
                            </div>

                            {/* Wiersz 2: 4 kolumny */}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Current club</label>
                                <select
                                    className="form-control form-size"
                                    value={playersAdd.current_club}
                                    onChange={(e) => handleFieldChange('current_club', e.target.value)}
                                >
                                    <option value="">Select club</option>
                                    {source.club.map((club, index) => (
                                        <option key={index} value={club}>{club}</option>
                                    ))}
                                </select>
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Previous club</label>
                                <input
                                    type="text"
                                    className="form-control form-size"
                                    value={playersAdd.previous_club}
                                    onChange={(e) => handleFieldChange('previous_club', e.target.value)}
                                />
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Market value</label>
                                <input
                                    type="text"
                                    className="form-control form-size"
                                    value={playersAdd.market_value}
                                    onChange={(e) => handleFieldChange('market_value', e.target.value)}
                                />
                            </div>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                                <label>Height</label>
                                <input
                                    type="text"
                                    className="form-control form-size"
                                    value={playersAdd.height}
                                    onChange={(e) => handleFieldChange('height', e.target.value)}
                                />
                            </div>

                                <div className="col-12 d-flex justify-content-end">
                                <Button className="py-2 px-4 " onClick={addPlayer}>Add</Button>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
            </Collapse>
        </div>
       );

}

export default AddPlayerToDatabase;