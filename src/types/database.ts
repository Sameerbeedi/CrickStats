export interface Player {
  Player_ID: string;
  Player_Name: string;
  Player_Age: number;
  Player_Team: string;
  Player_Role: 'Captain' | 'Vice-Captain' | 'Player';
  Player_Type: 'Batsman' | 'Bowler' | 'All-rounder';
  Player_Stats: any;
  Player_DOB: Date;
}

export interface Team {
  Team_ID: string;
  Team_Name: string;
  Team_Coach: any;
}

export interface Match {
  Match_ID: string;
  Match_Date: Date;
  Match_Venue: any;
  Match_Format: 'Test' | 'ODI' | 'T20I';
  Team_A: string;
  Team_B: string;
}

export interface Series {
  Series_ID: string;
  Series_Name: string;
  Series_Type: 'Bilateral' | 'Tri-series' | 'World Cup' | 'League' | 'Others';
  Host_Country: string;
  Series_start: Date;
  Series_end: Date;
  Participating_Teams: any;
  Total_Matches: number;
  Winner: string;
}

export interface Performance {
  Performance_ID: string;
  Match_ID: string;
  Player_ID: string;
  Player_Stats_Match: any;
}
export interface Coach {
  Coach_ID: string;
  Coach_Name: string;
  Coach_Age: number;
  Coach_Team?: string;
  Coach_Type: 'Head Coach' | 'Assistant Coach' | 'Batting Coach' | 'Bowling Coach' | 'Fielding Coach';
  Coach_Experience: number;
  Coach_Nationality: string;
  Coach_Start_Date: Date;
  Coach_Achievements?: string[];
  Coach_Specialization?: string[];
}
