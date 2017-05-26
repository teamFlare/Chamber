exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('submissions', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.string('type').notNullable();
      table.string('tempo').nullable();
      table.string('link').nullable();
    }),
    knex.schema.createTableIfNotExists('collaborations', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('beat_id').references('submissions.id').onDelete('CASCADE');
      table.integer('collab_id').references('submissions.id').onDelete('CASCADE');
      table.string('link').nullable();
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('submissions'),
    knex.schema.dropTable('collaborations'),
  ]);
};
