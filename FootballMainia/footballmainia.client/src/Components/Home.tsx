import { useEffect, useCallback,useState } from 'react';
import LeagueBlock from './Home/LiveMatchesComponents/LeagueBlock.tsx'
import { League } from '../Components/Interfaces/LeagueClass/LeagueItem.tsx'
function Home() {
    useEffect(() => {
        populateMatchesData();
    }, []);
    const [leagues, setLeagues] = useState<League[]>([]);
    const populateMatchesData = useCallback(async () => {
        const response = await fetch('home/getAllMatches'); // <-- tutaj zmieñ na twój backend endpoint!
        const data: League[] = await response.json();
        setLeagues(data);

    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center"><LeagueBlock leagues={leagues} /></div>
        </div>
        
        
    );

}

export default Home;