use CrickStats;
# To enable or disable safe mode
SET SQL_SAFE_UPDATES = 1;

-- To get match details with Team A's name
SELECT m.Match_ID, m.Match_Date, t.Team_Name as Team_A_Name, m.Result
FROM C_Match m
JOIN Team t ON m.Team_A = t.Team_ID;

-- To get both teams' names for each match
SELECT 
    m.Match_ID,
    m.Match_Date,
    t1.Team_Name as Team_A_Name,
    t2.Team_Name as Team_B_Name,
    m.Result
FROM C_Match m
JOIN Team t1 ON m.Team_A = t1.Team_ID
JOIN Team t2 ON m.Team_B = t2.Team_ID;

-- To include venue information
SELECT 
    m.Match_ID,
    m.Match_Date,
    t1.Team_Name as Team_A_Name,
    t2.Team_Name as Team_B_Name,
    m.Match_Venue->>'$.ground' as Ground,
    m.Match_Venue->>'$.city' as City,
    m.Match_Venue->>'$.country' as Country,
    m.Result
FROM C_Match m
JOIN Team t1 ON m.Team_A = t1.Team_ID
JOIN Team t2 ON m.Team_B = t2.Team_ID;


-- to view total stats of players 
SELECT 
    p.Player_ID,
    p.Player_Name,
    p.Player_Age,
    p.Player_Team,
    p.Player_Role,
    p.Player_Type,
    ps.Matches,
    ps.Runs,
    ps.Highest_Score,
    ps.Batting_Average,
    ps.Hundreds,
    ps.Wickets,
    ps.Bowling_Average,
    ps.FiveWicket_Hauls,
    ps.Catches,
    ps.Stumpings
FROM 
    Player p
JOIN 
    PlayerStats ps
ON 
    p.Player_ID = ps.Player_ID;

 
-- see performance 

SELECT 
    p.Player_ID,
    p.Player_Name,
    p.Player_Team,
    p.Player_Role,
    m.Match_ID,
    m.Match_Date,
    m.Match_Format,
    m.Team_A,
    m.Team_B,
    m.Result,
    v.Ground,
    v.City,
    v.Country
FROM 
    Player AS p
JOIN 
    Performance AS perf
ON 
    p.Player_ID = perf.Player_ID
JOIN 
    C_Match AS m
ON 
    perf.Match_ID = m.Match_ID;
    

