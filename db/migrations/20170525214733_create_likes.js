exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('likes', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.integer('submission_id').references('submissions.id').onDelete('CASCADE');
      table.integer('collaboration_id').references('collaborations.id').onDelete('CASCADE');
    })
  ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('likes')
    ]);
}
