import { useEffect, useCallback } from 'react';
import TenStackTable from '../Components/TestComponents/TenStackTable'
function Home() {
    useEffect(() => {
        populateMatchesData();
    }, []);
    const populateMatchesData = useCallback(async () => {
        const response = await fetch('home/getAllMatches'); // <-- tutaj zmie� na tw�j backend endpoint!
        const data: any = await response.json();
        console.log(data);

    }, []);

    return (
        <div className="mt-1"><TenStackTable/></div>
        
    );

}

export default Home;