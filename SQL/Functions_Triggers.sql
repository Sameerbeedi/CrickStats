use CrickStats;
# To enable or disable safe mode
SET SQL_SAFE_UPDATES = 1;
-- to change coach name 
DELIMITER $$

CREATE TRIGGER update_team_coach
BEFORE UPDATE ON Team
FOR EACH ROW
BEGIN
    
    IF NEW.Team_Name ='India' and NEW.Team_Coach != OLD.Team_Coach THEN
        
        SET NEW.Team_Coach = JSON_SET(NEW.Team_Coach,
                                      '$.Head coach', 'Gautam Gamhir',  
                                      '$.country', 'India');        
    END IF;
END $$

DELIMITER ;

-- function  to extract from json 
-- DELIMITER //

-- CREATE FUNCTION ExtractPlayerStats(
--     p_stats JSON,
--     p_stat_name VARCHAR(50)
-- ) 
-- RETURNS FLOAT
-- DETERMINISTIC
-- BEGIN
--     RETURN JSON_EXTRACT(p_stats, CONCAT('$.', p_stat_name));
-- END //

-- DELIMITER ;

-- -- Query to display player statistics in table form
-- SELECT 
--     Player_Name,
--     JSON_VALUE(Player_Stats, '$.matches') as Matches,
--     JSON_VALUE(Player_Stats, '$.runs') as Runs,
--     JSON_VALUE(Player_Stats, '$.HS') as Highest_Score,
--     JSON_VALUE(Player_Stats, '$.Batting_Ave') as Batting_Average,
--     JSON_VALUE(Player_Stats, '$.100') as Centuries,
--     JSON_VALUE(Player_Stats, '$.Wkts') as Wickets,
--     JSON_VALUE(Player_Stats, '$.Bowling_Avg') as Bowling_Average,
--     JSON_VALUE(Player_Stats, '$.5') as Five_Wicket_Hauls,
--     JSON_VALUE(Player_Stats, '$.Ct') as Catches,
--     JSON_VALUE(Player_Stats, '$.St') as Stumpings
-- FROM Player
-- ORDER BY Player_Name;
--  
INSERT INTO PlayerStats (Player_ID, Matches, Runs, Highest_Score, Batting_Average, Hundreds, Wickets, Bowling_Average, FiveWicket_Hauls, Catches, Stumpings)
SELECT 
    Player_ID,
    JSON_EXTRACT(Player_Stats, '$."matches"') AS Matches,
    JSON_EXTRACT(Player_Stats, '$."runs"') AS Runs,
    JSON_EXTRACT(Player_Stats, '$."HS"') AS Highest_Score,
    JSON_EXTRACT(Player_Stats, '$."Batting_Ave"') AS Batting_Average,
    JSON_EXTRACT(Player_Stats, '$."100"') AS Hundreds,
    JSON_EXTRACT(Player_Stats, '$."Wkts"') AS Wickets,
    JSON_EXTRACT(Player_Stats, '$."Bowling_Avg"') AS Bowling_Average,
    JSON_EXTRACT(Player_Stats, '$."5"') AS FiveWicket_Hauls,
    JSON_EXTRACT(Player_Stats, '$."Ct"') AS Catches,
    JSON_EXTRACT(Player_Stats, '$."St"') AS Stumpings
FROM Player;

INSERT INTO Venue(Venue_ID, Ground, City, Country)
SELECT 
    Match_ID,
    JSON_EXTRACT(Match_Venue, '$."ground"') AS Ground,
    JSON_EXTRACT(Match_Venue, '$."city"') AS City,
    JSON_EXTRACT(Match_Venue, '$."country"') AS Country
FROM C_Match;


-- Trigger to add player performace  data 
DELIMITER //

CREATE TRIGGER after_match_insert
AFTER INSERT ON C_Match
FOR EACH ROW
BEGIN
    -- Insert into the Performance table using the new match ID
    INSERT INTO Performance (
        Performace_ID,
        Match_ID,
        Player_ID,
        Player_Stats_Match
    )
    VALUES (
        CONCAT('PE', LPAD(LAST_INSERT_ID(), 3, '0')), -- Generates a new performance ID
        NEW.Match_ID, -- Uses the Match_ID from the new C_Match entry
        'P001', -- Example Player_ID (you may need to customize this)
        '{"Runs":"0","Balls":"0","4s":"0","6s":"0","S/R":"0.00","Status":"Not Played"}' 
    );
END;

//
DELIMITER ;


-- DELIMITER //

-- CREATE TRIGGER update_player_stats 
-- AFTER INSERT ON Performance 
-- FOR EACH ROW 
-- BEGIN
--     DECLARE current_stats JSON;
--     
--     -- Get current player stats
--     SELECT Player_Stats INTO current_stats 
--     FROM Player 
--     WHERE Player_ID = NEW.Player_ID;
--     
--     -- Update the player statistics with new performance data
--     UPDATE Player 
--     SET Player_Stats = JSON_SET(
--         current_stats,
--         '$.matches', JSON_EXTRACT(current_stats, '$.matches') + 1,
--         '$.runs', JSON_EXTRACT(current_stats, '$.runs') + NEW.Runs,
--         '$.Wkts', JSON_EXTRACT(current_stats, '$.Wkts') + NEW.Wickets,
--         '$.Ct', JSON_EXTRACT(current_stats, '$.Ct') + NEW.Catches,
--         '$.St', JSON_EXTRACT(current_stats, '$.St') + NEW.Stumpings
--     )
--     WHERE Player_ID = NEW.Player_ID;
--     
--     -- Update Batting Average
--     UPDATE Player 
--     SET Player_Stats = JSON_SET(
--         Player_Stats,
--         '$.Batting_Ave', 
--         ROUND(
--             JSON_EXTRACT(Player_Stats, '$.runs') / 
--             NULLIF(JSON_EXTRACT(Player_Stats, '$.matches'), 0),
--             2
--         )
--     )
--     WHERE Player_ID = NEW.Player_ID;
--     
--     -- Update Bowling Average
--     UPDATE Player 
--     SET Player_Stats = JSON_SET(
--         Player_Stats,
--         '$.Bowling_Avg',
--         ROUND(
--             JSON_EXTRACT(Player_Stats, '$.runs') / 
--             NULLIF(JSON_EXTRACT(Player_Stats, '$.Wkts'), 0),
--             2
--         )
--     )
--     WHERE Player_ID = NEW.Player_ID;
--     
--     -- Update Highest Score if new score is higher
--     IF NEW.Runs > JSON_EXTRACT(current_stats, '$.HS') THEN
--         UPDATE Player 
--         SET Player_Stats = JSON_SET(
--             Player_Stats,
--             '$.HS', NEW.Runs
--         )
--         WHERE Player_ID = NEW.Player_ID;
--     END IF;
--     
--     -- Update Centuries count if applicable
--     IF NEW.Runs >= 100 THEN
--         UPDATE Player 
--         SET Player_Stats = JSON_SET(
--             Player_Stats,
--             '$.100', JSON_EXTRACT(Player_Stats, '$.100') + 1
--         )
--         WHERE Player_ID = NEW.Player_ID;
--     END IF;
--     
--     -- Update 5-wicket hauls if applicable
--     IF NEW.Wickets >= 5 THEN
--         UPDATE Player 
--         SET Player_Stats = JSON_SET(
--             Player_Stats,
--             '$.5', JSON_EXTRACT(Player_Stats, '$.5') + 1
--         )
--         WHERE Player_ID = NEW.Player_ID;
--     END IF;
-- END //

-- DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetTopTeamsByWinPercentage()
BEGIN
    -- Calculate win percentage for each team
    SELECT 
        team_name,
        (SUM(CASE WHEN result = 'Win' THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS win_percentage
    FROM 
        team_stats
    GROUP BY 
        team_name
    ORDER BY 
        win_percentage DESC
    LIMIT 3;
END //

DELIMITER ;
