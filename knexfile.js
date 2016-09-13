// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'stand-down-app'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
