
exports.up = function (knex, Promise) {
  return knex.schema.createTable('photos', table => {
    table.increments();
    table.string('link').notNullable();
    table.integer('owner').references('users.id');
    table.string('description');
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('photos');
};
