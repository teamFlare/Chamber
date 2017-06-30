const LOCAL_PG = {
    "database": "thesis",
    "user": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": 5432
}
//deploy heroku
module.exports = {
    client: "postgresql",
    connection: LOCAL_PG || process.env.DATABASE_URL + '? ssl=true',
    pool: {
        "min": 2,
        "max": 10000
    },
    migrations: {
        "tableName": "knex_migrations",
        "directory": "./db/migrations",
    },
    seeds: {
        "directory": "./db/seeds"
    },
    debug: false
};