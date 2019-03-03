const db = require('../../db');
var fs = require('fs');
var train = fs.createWriteStream('train.txt');
var test = fs.createWriteStream('test.txt');
var val = fs.createWriteStream('validate.txt');



const Sequelize = require('sequelize');
const config = require ("../../db/config");

const sequelize = new Sequelize(
    config.dbname,
    config.user,
    config.password,
    {
        host:config.host,
        port:config.port,
        dialect:config.dialect,
        pool: {
            idle: 10000
        }
    }
)

// db.findAll({where: {}, order: [ [ 'createdAt', 'ASC' ]]})
// .then(allRecods => {
//     file.on('error', function(err) { console.log(err)});
//     allRecods.forEach((record, index) => {
//         file.write(index + " " + record.dataValues.number_ppl + '\n')
//     })
//     file.end();
    
    

    
    
// })


const query = "select  case when dayofweek(t.createdAt) = 2 then 1 else 0 end as mon, " +
                    "case when dayofweek(t.createdAt) = 3 then 1 else 0 end as tue, " +
                    "case when dayofweek(t.createdAt) = 4 then 1 else 0 end as wed, " +
                    "case when dayofweek(t.createdAt) = 5 then 1 else 0 end as thu, " +
                    "case when dayofweek(t.createdAt) = 6 then 1 else 0 end as fri, " +
                    "case when dayofweek(t.createdAt) = 7 then 1 else 0 end as sat, " +
                    "case when dayofweek(t.createdAt) = 1 then 1 else 0 end as sun," +
                    "CAST(time_to_sec(t.createdAt) / (60 * 60) AS DECIMAL(10,4))  as time," +
                    "t.number_ppl as occu " + 
                "from    rpt_occupations t;"

const query1 = "select * from rpt_occupations t;"

sequelize.query(query)
  .then(records => {
    const data = records[0];
    // file.on('error', function(err) { console.log(err)});
    data.forEach((record, index) => {
        if(index % 10 == 0) {
            for (var key in record) {
            
                test.write(record[key] + " ")
            }
            test.write('\n')
        } else if (index % 11 == 0) {
            for (var key in record) {
                val.write(record[key] + " ")
            }
            val.write('\n')
        } else {
            for (var key in record) {
            
                train.write(record[key] + " ")
            }
            train.write('\n')
        }
        
        // 
    })
    test.end();
    val.end();
    train.end();

  })