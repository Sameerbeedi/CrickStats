use CrickStats;
# To enable or disable safe mode
SET SQL_SAFE_UPDATES = 1;

insert into performance(
Performace_ID  ,
Match_ID ,
Player_ID ,
PLayer_Stats_Match 
)
values(
'PE001',
'WM001',
'P001',
'{"Runs":"52","Balls":"37","4s":"4","6s":"3","S/R":"140.54","Status":"Not Out"}'
);
