
exports.up = function (knex) {
    return knex.schema.createTable('movies', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('director').notNull()
        table.string('genre').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('movies')
};
