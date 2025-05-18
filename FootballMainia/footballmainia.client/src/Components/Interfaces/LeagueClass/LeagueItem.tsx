export interface Match {
    team1: string;
    team2: string;
    team1Img: string;
    team2Img: string;
    date: string; // ISO string
    status: string;
    result: string;
}

export interface League {
    leagueName: string;
    leagueImg: string;
    matches: Match[];
}