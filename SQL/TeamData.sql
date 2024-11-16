use CrickStats;
# To enable or disable safe mode
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE Team
modify column Team_Name varchar(50);

INSERT INTO Team(
Team_ID ,
Team_Name ,
Team_Coach 
)
VALUES(
'T01',
'Afghanistan',
'{"Head coach" : "Jonathan Trott","country":"England"}'
),(
'T02',
'Australia',
'{"Head coach" : "Andrew McDonald","country":"Australia"}'
),
(
'T03',
'Bangladesh',
'{"Head coach" : "Chandika Hathurusingha","country":"Sri Lanka"}'
),
(
'T04',
'Canada',
'{"Head coach" : "Pubudu Dassanayake","country":"Sri Lanka"}'
),
(
'T05',
'England',
'{"Head coach" : "Matthew Mott","country":"Australia"}'
),
(
'T06',
'India',
'{"Head coach" : "Rahul Dravid","country":"India"}'
),
(
'T07',
'Ireland',
'{"Head coach" : "Heinrich Malan","country":"South Africa"}'
),
(
'T08',
'Namibia',
'{"Head coach" : "Pierre de Bruyn","country":"South Africa"}'
),
(
'T09',
'Nepal',
'{"Head coach" : "Monty Desai","country":"India"}'
),
(
'T10',
'Netherlands',
'{"Head coach" : "Ryan Cook","country":"South Africa"}'
),
(
'T11',
'New Zealand',
'{"Head coach" : "Gary Stead","country":"New Zealand"}'
),
(
'T12',
'Oman',
'{"Head coach" : "Duleep Mendis","country":"Sri Lanka"}'
),
(
'T13',
'Pakistan',
'{"Head coach" : "Gary Kirsten","country":"South Africa"}'
),
(
'T14',
'Papua New Guinea',
'{"Head coach" : "Tatenda Taibu","country":"Zimbabwe"}'
),
(
'T15',
'Scotland',
'{"Head coach" : "Doug Watson","country":"South Africa"}'
),
(
'T16',
'South Africa',
'{"Head coach" : "Rob Walter","country":"South Africa"}'
),
(
'T17',
'Sri Lanka',
'{"Head coach" : "Chris Silverwood","country":"England"}'
),
(
'T18',
'Uganda',
'{"Head coach" : "Abhay Sharma","country":"India"}'
),
(
'T19',
'United States of America',
'{"Head coach" : "Stuart Law","country":"Australia"}'
),
(
'T20',
'West Indies',
'{"Head coach" : "Daren Sammy","country":"West Indies"}'
);
select * from team;