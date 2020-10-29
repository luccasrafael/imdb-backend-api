const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config])
    .then(function () {
        return knex.seed.run();
    })
module.exports = knex