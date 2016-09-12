exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('post_id')
      .references('id')
      .inTable('posts');
    table.integer('commenter_id')
      .references('id')
      .inTable('users');
    table.text('body');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
}
