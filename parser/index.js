const Xray = require('x-ray');
const x = Xray();
const CronJob = require('cron').CronJob;

const db = require('../db')
const logger = require('../logger')

const MAX_PEOPLE_NUMBER = 120;
const SPORT_CENTER_URL = 'https://www.st-andrews.ac.uk/sport/';

new CronJob('0 */1 * * * *', function() {
    insertData()
}, null, true);


function getGymPeople() {
    return new Promise((resolve, reject) => {
        x(SPORT_CENTER_URL, '.gym-box', [{
            occupancy: 'h3'
        }])
        ((err, data) => {
            if (err) 
                reject("ERR:X-Ray " + err)
            if (data) {
                const percent = data[0].occupancy.split(" ")[1]
                const peopleNumber = Math.floor(MAX_PEOPLE_NUMBER * (parseFloat(percent) / 100)) 
                resolve(peopleNumber)
            } else 
                reject('undefined');
        })
    })
}

function getLastRecord() {
    return new Promise((resolve, reject) => {
        db.findAll({limit: 1, where: {}, order: [ [ 'createdAt', 'DESC' ]]})
        .then(lastNumber => {
            resolve(lastNumber[0].dataValues);
        })
        .catch(err => {
            reject("ERR:getLastRecord " + err)
        });
    })
}

function insertData() {
    getGymPeople().then(currentNumber => 
    getLastRecord().then(lastRecord => {
        const lastNumber = lastRecord.number_ppl;
        if(currentNumber != lastNumber)
            db.create({number_ppl:currentNumber})
    }))
    .catch(err => {
        logger.info('ERR:insertData ', err, new Date().toJSON());
    })
}








