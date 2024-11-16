use CrickStats;
# To enable or disable safe mode
SET SQL_SAFE_UPDATES = 1;
INSERT INTO Player (
    Player_ID,
    Player_Name,
    Player_Age,
    Player_Team,
    Player_Role,
    Player_Type,
    Player_Stats,
    Player_DOB
)
VALUES 
(
    'P001',                               
    'Rohit Sharma',                            
   37,                                   
    'India',                             
    'Captain',                            
    'Batsman',                            
    '{"matches":488 , "runs": 19367, "HS":264,"Batting_Ave":42.65,"100":48,"Wkts":12,"Bowling_Avg":72.5,"5":0,"Ct":225,"St":0 }',  
    '1987-04-30'                           
),
(
    'P002',                               
    'Virat Kohli',                             
    35,                                   
    'India',                             
    'Player',                            
    'Batsman',                            
    '{"matches":538 , "runs": 27134, "HS":254,"Batting_Ave":52.78,"100":80,"Wkts":9,"Bowling_Avg":107.5,"5":0,"Ct":320,"St":0 }',  
    '1988-11-05'                           
),
(	
	'P003',                               
    'RA Jadeja',                             
    35,                                   
    'India',                             
    'Player',                            
    'All-Rounder',                            
    '{"matches":348 , "runs": 6506, "HS":175,"Batting_Ave":32.36,"100":4,"Wkts":593,"Bowling_Avg":28.8,"5":17,"Ct":148,"St":0 }',  
    '1988-12-06' 
),
(	
	'P004',                               
    'R Ashwin',                             
    38,                                   
    'India',                             
    'Player',                            
    'Bowler',                            
    '{"matches":286 , "runs": 4365, "HS":124,"Batting_Ave":23.72,"100":6,"Wkts":764,"Bowling_Avg":25.7,"5":37,"Ct":78,"St":0 }',  
    '1986-09-17' 
),
(	
	'P005',                               
    'HH Pandya',                             
    31,                                
	'India',                             
    'Player',                            
    'All-Rounder',                            
    '{"matches":204 , "runs": 3983, "HS":108,"Batting_Ave":30.87,"100":1,"Wkts":188,"Bowling_Avg":30.8,"5":1,"Ct":93,"St":0 }',  
    '1993-12-06' 
),
(	
	'P006',                               
    'RR Pant',                             
    27 ,                               
	'India',                             
    'Player',                            
    'Batsman',                            
    '{"matches":145 , "runs": 4773, "HS":159,"Batting_Ave":34.33,"100":7,"Wkts":0,"Bowling_Avg":0,"5":0,"Ct":191,"St":27 }',  
    '1997-10-04' 
),
(	
	'P007',                               
    'AR Patel',                             
    30 ,                               
	'India',                             
    'Player',                            
    'All-Rounder',                            
    '{"matches":138 , "runs": 1711, "HS":84,"Batting_Ave":23.76,"100":0,"Wkts":181,"Bowling_Avg":11,"5":5,"Ct":51,"St":0 }',  
    '1994-01-20' 
),
(	
	'P008',                               
    'SA Yadav',                             
    34,                               
	'India',                             
    'Player',                            
    'Batsman',                            
    '{"matches":114 , "runs": 3350, "HS":117,"Batting_Ave":36.82,"100":4,"Wkts":2,"Bowling_Avg":11,"5":0,"Ct":63,"St":0 }',  
    '1990-09-14' 
),
(	
	'P009',                               
    'Shubman Gill',                             
    25 ,                               
	'India',                             
    'Player',                            
    'Batsman',                            
    '{"matches":97 , "runs": 4706, "HS":208,"Batting_Ave":43.47,"100":12,"Wkts":0,"Bowling_Avg":0,"5":0,"Ct":61,"St":0 }',  
    '1999-09-08' 
),
(	
	'P010',                               
    'Mohammed Siraj',                             
    30  ,                              
	'India',                             
    'Player',                            
    'Bowler',                            
    '{"matches":91 , "runs": 177, "HS":16,"Batting_Ave":5.53,"100":1,"Wkts":165,"Bowling_Avg":27.9,"5":4,"Ct":26,"St":0 }',  
    '1994-03-13' 
),
(	
	'P011',                               
    'Washington Sundar',                             
    25   ,                             
	'India',                             
    'Player',                            
    'All-Rounder',                            
    '{"matches":80 , "runs": 830, "HS":96,"Batting_Ave":26.77,"100":0,"Wkts":92,"Bowling_Avg":24.5,"5":1,"Ct":26,"St":0 }',  
    '1999-10-05' 
),
(	
	'P012',                               
    'Arshdeep Singh',                             
    25 ,                               
	'India',                             
    'Player',                            
    'Bowler',                            
    '{"matches":66 , "runs": 102, "HS":18,"Batting_Ave":10.20,"100":0,"Wkts":101,"Bowling_Avg":19.32,"5":1,"Ct":16,"St":0 }',  
    '1999-02-05' 
),
(	
	'P013',                               
    'SV Samson',                             
    30    ,                           
	'India',                             
    'Player',                            
    'Batsman',                            
    '{"matches":51 , "runs": 1211, "HS":111,"Batting_Ave":32.72,"100":3,"Wkts":0,"Bowling_Avg":0,"5":0,"Ct":30,"St":6 }',  
    '1994-11-11' 
);

alter table C_Match 
add column result enum ('Won','Lost','Tie','Draw','No result');
ALTER TABLE C_Match
MODIFY COLUMN Team_B VARCHAR(50);

-- UPDATE c_match
-- SET Team_A = '6'  -- Replace with the new Team_ID
-- WHERE Team_A = 'India';  -- Replace with the old Team_ID

CREATE TABLE PlayerStats (
    Player_ID VARCHAR(10) PRIMARY KEY,
    Matches INT,
    Runs INT,
    Highest_Score INT,
    Batting_Average DECIMAL(5,2),
    Hundreds INT,
    Wickets INT,
    Bowling_Average DECIMAL(5,2),
    FiveWicket_Hauls INT,
    Catches INT,
    Stumpings INT
);
CREATE TABLE Venue(
Venue_ID VARCHAR(10) PRIMARY KEY,
Ground char(50) ,
City char(20),
Country char(20)
);

ALTER TABLE Venue
MODIFY COLUMN Ground CHAR(100);

alter table performance 
add column Venue_ID varchar(5);
SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE Player DROP PRIMARY KEY;
ALTER TABLE Player MODIFY Player_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE Team DROP PRIMARY KEY;
ALTER TABLE Team MODIFY Team_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE C_Match DROP PRIMARY KEY;
ALTER TABLE C_Match MODIFY Match_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE series DROP primary key;
ALTER TABLE series MODIFY Series_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE performance drop primary key;
ALTER TABLE Performance MODIFY Performace_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE USER DROP PRIMARY KEY;
ALTER TABLE User MODIFY User_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE REPORT DROP PRIMARY KEY ;
ALTER TABLE report MODIFY Report_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE VENUE DROP PRIMARY KEY;
ALTER TABLE Venue MODIFY Venue_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());
ALTER TABLE PLAYERSTATS DROP PRIMARY KEY;
ALTER TABLE PlayerStats MODIFY Player_ID VARCHAR(36) PRIMARY KEY DEFAULT (UUID());

	
ALTER TABLE report DROP FOREIGN KEY report_ibfk_3;
ALTER TABLE Performance DROP FOREIGN KEY performance_ibfk_2;

ALTER TABLE report
ADD CONSTRAINT report_ibfk_3 FOREIGN KEY (Player_ID) REFERENCES Player(Player_ID);

ALTER TABLE Performance
ADD CONSTRAINT performance_ibfk_2 FOREIGN KEY (Player_ID) REFERENCES Player(Player_ID);

SELECT CONSTRAINT_NAME, TABLE_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME = 'Team' AND REFERENCED_COLUMN_NAME = 'Team_ID';
ALTER TABLE C_Match DROP foreign key c_match_ibfk_1;
ALTER TABLE C_Match DROP foreign key c_match_ibfk_2;
ALTER TABLE Report DROP foreign key report_ibfk_1;
-- Add foreign key constraints for C_Match
ALTER TABLE C_Match
ADD CONSTRAINT c_match_ibfk_1 FOREIGN KEY (Team_A) REFERENCES Team(Team_ID);

ALTER TABLE C_Match
ADD CONSTRAINT c_match_ibfk_2 FOREIGN KEY (Team_B) REFERENCES Team(Team_ID);

-- Add foreign key constraint for report
ALTER TABLE report
ADD CONSTRAINT report_ibfk_1 FOREIGN KEY (Team_ID) REFERENCES Team(Team_ID);


SELECT CONSTRAINT_NAME, TABLE_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME = 'C_Match' AND REFERENCED_COLUMN_NAME = 'Match_ID';
ALTER TABLE performance drop foreign key performance_ibfk_1;
ALTER TABLE report drop foreign key report_ibfk_2;

-- Add foreign key constraint for Performance table
ALTER TABLE Performance
ADD CONSTRAINT performance_ibfk_1 FOREIGN KEY (Match_ID) REFERENCES C_Match(Match_ID);

-- Add foreign key constraint for report table
ALTER TABLE report
ADD CONSTRAINT report_ibfk_2 FOREIGN KEY (Match_ID) REFERENCES C_Match(Match_ID);
ALTER TABLE User MODIFY User_Password VARCHAR(255);

SELECT CONSTRAINT_NAME, TABLE_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME = 'roles' AND REFERENCED_COLUMN_NAME = 'id';
ALTER TABLE user
ADD CONSTRAINT role_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles(id);
alter table user drop foreign key role_ibfk_1;

TRUNCATE TABLE User;
