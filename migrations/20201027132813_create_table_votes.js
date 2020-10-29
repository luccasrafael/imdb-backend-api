
exports.up = function (knex) {
    return knex.schema.createTable('votes', table => {
        table.increments('id').primary()
        table.integer('vote').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('moviesId').references('id')
            .inTable('movies').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('votes')
};
