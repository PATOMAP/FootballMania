import React, { useState } from 'react';

function Home() {
    const [selectedOption, setSelectedOption] = useState<string>();
    function SelectFromFirstDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.currentTarget.value.toString());
    }


    return (
        <div className="p-4">
            <label className="block mb-2">Wybierz typ pola:</label>
            <select
                className="border rounded px-2 py-1"
                value={selectedOption}
                onChange={(e) => SelectFromFirstDropdown(e)}
            >
                <option value="">-- Wybierz --</option>
                <option value="input">Pole tekstowe</option>
                <option value="select">Inny dropdown</option>
                <option value="textarea">Textarea</option>
            </select>

            <div className="mt-4">
                {selectedOption === 'input' && (
                    <input
                        type="text"
                        placeholder="Wpisz coœ..."
                        className="border rounded px-2 py-1 w-full"
                    />
                )}

                {selectedOption === 'select' && (
                    <select className="border rounded px-2 py-1 w-full">
                        <option value="">Opcja A</option>
                        <option value="1">Opcja 1</option>
                        <option value="2">Opcja 2</option>
                    </select>
                )}

                {selectedOption === 'textarea' && (
                    <textarea
                        placeholder="Wpisz opis..."
                        className="border rounded px-2 py-1 w-full"
                    />
                )}
            </div>
        </div>
    );
}

export default Home;