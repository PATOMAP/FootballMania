import { InformationType } from '../Interfaces/FilterPlayers'
import PlayersItem from '../Interfaces/PlayersItem';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
type InformationPlayer = {
    source: InformationType;
    /*setPlayers: React.Dispatch<React.SetStateAction<PlayersItem[]>>;*/
}

const AddPlayerToDatabase: React.FC<InformationPlayer> = ({ source }) => {
    const [playersAdd, setPlayerAdd] = useState<PlayersItem>({
        age: 0, current_club: '', full_name: '', height: '', market_value: '', nationality: '', number: 0, player_id: 0, position:'',previous_club:''
    });
    function handleFieldChange(field: keyof PlayersItem, value: string | number) {
        setPlayerAdd(p =>  ({ ...p, [field]: value }));
    }
    async function addPlayer() {
        console.log(playersAdd);
        // await fetch('playerslist/addPlayer', {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json',
        //    },
        //     body: JSON.stringify(playersAdd),
        //});
    }
    return (<div className="d-flex align-items-center gap-2 mb-3">
        <input
            type="number"
            className="form-control"
            value={playersAdd.number}
            onChange={(e) => handleFieldChange('number', +e.target.value)}
        />
        <input
            type="text"
            className="form-control"
            value={playersAdd.full_name}
            onChange={(e) => handleFieldChange('full_name', e.target.value)}
        />
        <select className="border rounded px-2 py-1 w-full"
            value={playersAdd.position}
            onChange={(e) => handleFieldChange('current_club', e.target.value)}>
            <option value="">Wybierz pozycje</option>
            {source.position.map((pos, index) => (
                <option key={index} value={pos}>
                    {pos}
                </option>

            ))}
        </select>
        <input
            type="number"
            className="form-control"
            value={playersAdd.age}
            onChange={(e) => handleFieldChange('age', +e.target.value)}
        />
        <input
            type="text"
            className="form-control"
            value={playersAdd.nationality}
            onChange={(e) => handleFieldChange('nationality', e.target.value)}
        />
        <select className="border rounded px-2 py-1 w-full"
            value={playersAdd.current_club}
            onChange={(e) => handleFieldChange('current_club', e.target.value)}>
            <option value="">Wybierz klub</option>
            {source.club.map((club, index) => (
                <option key={index} value={club}>
                    {club}
                </option>
            ))}
        </select>
        <input
            type="text"
            className="form-control"
            value={playersAdd.previous_club}
            onChange={(e) => handleFieldChange('previous_club', e.target.value)}
        />
        <input
            type="text"
            className="form-control"
            value={playersAdd.market_value}
            onChange={(e) => handleFieldChange('market_value', e.target.value)}
        />
        <input
            type="text"
            className="form-control"
            value={playersAdd.height}
            onChange={(e) => handleFieldChange('height', e.target.value)}
        />

        <Button className="ms-2 py-1 px-3" onClick={() => addPlayer()}>Add</Button>
    </div>);

}

export default AddPlayerToDatabase;