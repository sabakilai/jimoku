select  case when dayofweek(t.createdAt) = 2 then 1 else 0 end as mon, 
        case when dayofweek(t.createdAt) = 3 then 1 else 0 end as tue, 
        case when dayofweek(t.createdAt) = 4 then 1 else 0 end as wed, 
        case when dayofweek(t.createdAt) = 5 then 1 else 0 end as thu, 
        case when dayofweek(t.createdAt) = 6 then 1 else 0 end as fri, 
        case when dayofweek(t.createdAt) = 7 then 1 else 0 end as sat, 
        case when dayofweek(t.createdAt) = 1 then 1 else 0 end as sun,
        CAST(time_to_sec(t.createdAt) / (60 * 60) AS DECIMAL(10,4))  as time,
        t.number_ppl as occu
from    rpt_occupations t

