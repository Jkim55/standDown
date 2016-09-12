exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('user_id')
      .references('id')
      .inTable('users');
    table.string('title');
    table.text('body');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
}
