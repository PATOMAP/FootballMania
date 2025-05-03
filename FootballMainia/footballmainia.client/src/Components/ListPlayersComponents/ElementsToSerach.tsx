import React, { useState } from 'react';
import { FilterPlayers, InformationType } from '../Interfaces/FilterPlayers';

type ItemsType = {

    InformationPlayers: InformationType;
    setPlayers: React.Dispatch<React.SetStateAction<FilterPlayers>>;
    playersFilter: FilterPlayers;

};
const ElementsToSerach: React.FC<ItemsType> = ({ setPlayers, InformationPlayers, playersFilter }) => {
    const [selectedOption, setSelectedOption] = useState<string>();
    function SelectFromFirstDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.currentTarget.value.toString());
    }

    return (
        <div className="p-4 d-flex justify-content-end mb-3">
            <label className="block mb-1  mx-2">Wybierz typ pola:</label>
            <select
                className="border rounded px-2 py-1 w-full"
                value={selectedOption}
                onChange={(e) => SelectFromFirstDropdown(e)}
            >
                <option value="">-- Wybierz --</option>
                <option value="name">Name</option>
                <option value="position">Position</option>
                <option value="club">Club</option>
            </select>

            <div className="mx-2 px-2">
                {selectedOption === 'name' && (
                    <input
                        type="text"
                        placeholder="Name"
                        className="border rounded px-2 py-1 w-full"
                        value={playersFilter.name}
                        onChange={(e) => setPlayers(c => ({ ...c, name: String(e.target.value) }))}
                    />
                )}

                {selectedOption === 'position' && (
                    <select className="border rounded px-2 py-1 w-full"
                        value={playersFilter.position}
                        onChange={(e) => setPlayers(c => ({ ...c, position: String(e.target.value)}))}>
                        <option value="">Wybierz pozycje</option>
                        {InformationPlayers.position.map((pos, index) => (
                            <option key={index} value={pos}>
                                {pos}
                            </option>

                        ))}
                    </select>)}

                {selectedOption === 'club' && (
                    <select className="border rounded px-2 py-1 w-full"
                        value={playersFilter.club}
                        onChange={(e) => setPlayers(c => ({ ...c, club: String(e.target.value)}))}>
                        <option value="">Wybierz klub</option>
                        {InformationPlayers.club.map((club, index) => (
                            <option key={index} value={club}>
                                {club}
                            </option>

                        ))}
                    </select>
                )}

            </div>
        </div>
    );
}
export default ElementsToSerach;

