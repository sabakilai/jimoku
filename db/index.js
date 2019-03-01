const Sequelize = require('sequelize');
const config = require ("./config")

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

var occupation = sequelize.define("rpt_occupation", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
    number_ppl: Sequelize.INTEGER
},{
    timestamps: true
})

occupation.sync().then(function() {});

module.exports = occupation;

