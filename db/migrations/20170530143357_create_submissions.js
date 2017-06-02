
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTableIfNotExists('submissions', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.string('type').notNullable();
      table.string('tempo').nullable();
      table.string('link').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('collaborations', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('beat_id').references('submissions.id').onDelete('CASCADE');
      table.integer('collab_id').references('submissions.id').onDelete('CASCADE');
      table.string('link').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('userSubmittedSongs', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.string('link').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('likes', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.integer('submission_id').references('submissions.id').onDelete('CASCADE');
      table.integer('collaboration_id').references('collaborations.id').onDelete('CASCADE');
      table.integer('usersubmitted_id').references('userSubmittedSongs.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('comments', function (table) {
      table.increments('id').unsigned().primary();
      table.string('comment').notNullable();
      table.integer('profiles_id').references('profiles.id').onDelete('CASCADE');
      table.integer('submission_id').references('submissions.id').onDelete('CASCADE');
      table.integer('collaboration_id').references('collaborations.id').onDelete('CASCADE');
      table.integer('usersubmitted_id').references('userSubmittedSongs.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('submissions'),
    knex.schema.dropTable('collaborations'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('userSubmittedSongs'),
    knex.schema.dropTable('comments')
  ]);
};
