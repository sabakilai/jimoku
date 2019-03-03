var express = require('express');
var router = express.Router();

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
    
    
    const prediction = [100, 90, 80, 80, 93, 94, 93, 100, 94, 94, 98, 93, 92, 92, 91, 84]

    
    const data = {
        prediction:prediction,
        bestTime:"18:32"
    }

    res.json({success:true, data: data});
});


module.exports = router;
