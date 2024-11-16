create database CrickStats;
use CrickStats;

create table Player(
Player_ID varchar(5) primary key,
Player_Name char(20) unique NOT NULL,
Player_Age int NOT NULL,
Player_Team  char(20) ,
Player_Role enum ('Captain','Vice-Captain','Player') default 'Player',
Player_Type enum ('Batsman' , 'Bowler' , 'All-rounder'),
Player_Stats json,
Player_DOB date
);

create table Team (
Team_ID varchar(5) primary key,
Team_Name char(20) unique NOT NULL,
Team_Coach JSON
);


create table C_Match(
Match_ID varchar(5) primary key ,
Match_Date date,
Match_Venue json,
Match_Format enum ('Test','ODI','T20I'),
Team_A VARCHAR(50),
Team_B VARCHAR(50),
Result enum ('Won','Lost','Tie','Draw','No result')
FOREIGN KEY (Team_A) REFERENCES Team(Team_ID),
FOREIGN KEY (Team_B) REFERENCES Team(Team_ID)
);


CREATE TABLE series (
    Series_ID VARCHAR(5) PRIMARY KEY,
    Series_Name VARCHAR(50) NOT NULL,
    Series_Type ENUM('Bilateral', 'Tri-series', 'World Cup', 'League', 'Others'),
    Host_Country CHAR(20),
    Series_start DATE,
    Series_end DATE,
    Participating_Teams JSON,
    Total_Matches INT,
    Winner CHAR(20)
);




create table Performance (
Performace_ID varchar(5) primary key ,
Match_ID varchar(5) not null,
Player_ID varchar(5) not null,
PLayer_Stats_Match json,
foreign key(Match_ID) references C_Match(Match_ID),
foreign key(Player_ID) references Player(Player_ID)
);

create table User(
User_ID varchar(5) primary key,
User_Role enum("Coach","Player","Fan"),
Username char(10) unique not null,
User_Password varchar(8) unique not null,
User_Email varchar(50) unique not null
);

create table report(
Report_ID varchar(5) primary key,
Team_ID varchar(5) not null,
Match_ID varchar(5) not null,
Player_ID varchar(5) not null,
Performance_Data json ,
foreign key(Team_ID) references Team(Team_ID),
foreign key(Match_ID) references C_Match(Match_ID),
foreign key(Player_ID) references Player(Player_ID)
);
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
Ground char(20) ,
City char(20),
Country char(20)
);


