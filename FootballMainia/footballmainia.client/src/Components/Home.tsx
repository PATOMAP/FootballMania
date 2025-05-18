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
        console.log(data);

    }, []);

    return (
        <div className="mt-1"><LeagueBlock leagues={leagues} /></div>
        
    );

}

export default Home;