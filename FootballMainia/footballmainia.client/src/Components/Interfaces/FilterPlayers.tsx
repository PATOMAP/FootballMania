export interface FilterPlayers {
    name: string;
    position: string;
    club: string;
}


export interface InformationType {
    position: string[];
    club: string[];
};

export interface PlayerCreateDto {
    number: number;
    full_name: string;
    position: string;
    age: number;
    nationality: string;
    current_club: string;
    previous_club: string;
    market_value: string;
    height: string;
}