var express = require('express');
var router = express.Router();
const request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({success:true, name:"Jimoku API"});
});

router.get('/time/:hours', function(req, res, next) {
    const hours = parseInt(req.params.hours);

    if (!Number.isInteger(hours))
        return res.json({success:false, error:'You have to provide amount parameter in hours'});
    
    if (hours < 1 || hours > 24 ) 
        return res.json({success:false, error:'Amount has to be between 1 and 24'});
    
    const options = {
        method: 'POST',
        uri: 'http://bb78.host.cs.st-andrews.ac.uk:8008/',
        // uri: 'http://127.0.0.1:8008/',
        form: {hours:hours}
    }
    
    request(options, (err, response, body) => {
        if(err) 
            return res.json({success:false, result: err});

        res.json({success:true, result: JSON.parse(body)});
    })

    
});


module.exports = router;
