import React from 'react';
import { FilterPlayers } from '../Interfaces/FilterPlayers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
type ItemsType = {

    setPlayers: React.Dispatch<React.SetStateAction<FilterPlayers>>;
    playersFilter: FilterPlayers;

};
const ActuallyFilter: React.FC<ItemsType> = ({setPlayers,playersFilter }) => {

    function handleFieldChange(field: keyof FilterPlayers, value:string) {
        setPlayers(p => ({ ...p, [field]: value }));
    }

    return (<div className="d-flex flex-row-reverse bd-highlight gap-3">
     
                {playersFilter.name !== "" ? (
                <div className="p-2 bd-highlight bg-info rounded-4">
                <label>{playersFilter.name}</label>
                <Button className="mx-2 rounded-circle bg-info border-0 p-0" onClick={() => handleFieldChange('name','')}>x</Button>
                </div>

                ) : (
                    null
        )}
        {playersFilter.club !== "" ? (
            <div className="p-2 bd-highlight bg-info rounded-4">
                <label>{playersFilter.club}</label>
                <Button className="mx-2 rounded-circle bg-info border-0 p-0" onClick={() => handleFieldChange('club', '')}>x</Button>
            </div>

        ) : (
            null
        )}
        {playersFilter.position !== "" ? (
            <div className="p-2 bd-highlight bg-info rounded-4">
                <label>{playersFilter.position}</label>
                <Button className="mx-2 rounded-circle bg-info border-0 p-0" onClick={() => handleFieldChange('position', '')}>x</Button>
            </div>

        ) : (
            null
        )} 
    </div>);
}
export default ActuallyFilter;