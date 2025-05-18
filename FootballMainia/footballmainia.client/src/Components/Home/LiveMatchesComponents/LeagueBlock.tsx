import { League } from '../../Interfaces/LeagueClass/LeagueItem'
import React from 'react';
type ItemsType = {
    leagues: League[];
}
const LeagueBlock: React.FC<ItemsType> = ({ leagues }) => {

    return (
        leagues === null || leagues.length===0
        ? (<div></div>) : (
        <div>
        <div className="d-flex flex-row bd-highlight">
            <img src={ leagues[0].leagueImg} alt="tu bêdzie zdjecie ligi"></img>
        <label>League:</label>
        </div>   
            </div>))
}
export default LeagueBlock