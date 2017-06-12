
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tournaments', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('round1_id').references('round1.id').onDelete('CASCADE');
      table.integer('round2_id').references('round2.id').onDelete('CASCADE');
      table.integer('round3_id').references('round3.id').onDelete('CASCADE');
      table.string('description').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('round1', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('matchup_id1').references('matchup.id').onDelete('CASCADE');
      table.integer('matchup_id2').references('matchup.id').onDelete('CASCADE');
      table.integer('matchup_id3').references('matchup.id').onDelete('CASCADE');
      table.integer('matchup_id4').references('matchup.id').onDelete('CASCADE');
      table.integer('round1_beat').references('submissions.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('round2', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('matchup_id1').references('matchup.id').onDelete('CASCADE');
      table.integer('matchup_id2').references('matchup.id').onDelete('CASCADE');
      table.integer('round2_beat').references('submissions.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('round3', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('matchup_id1').references('matchup.id').onDelete('CASCADE');
      table.integer('round3_beat').references('submissions.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('matchup', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('prof_id1').references('profiles.id').onDelete('CASCADE');
      table.integer('prof_id2').references('profiles.id').onDelete('CASCADE');
      table.integer('song_id1').references('submissions.id').onDelete('CASCADE');
      table.integer('song_id2').references('submissions.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tournaments'),
    knex.schema.dropTable('round1'),
    knex.schema.dropTable('round2'),
    knex.schema.dropTable('round3'),
    knex.schema.dropTable('matchup'),
  ]);
};
