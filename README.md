# Project Name

The project description

## Team

- Steven Chang
- Nikhil Mehta
- Prateek Bhatt

## Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1ChmQ4UzuP3FsjRpBFyu3CBTEi_cpAIB2jsUvP3FxMzQ/edit)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

```
*** list of .gitignore files (please do this before running yarn or npm) ***
node_modules
config/development.json
config/production.json
config/test.json
```

### Installing System Dependencies

### list of .gitignore files
(please do this before running yarn)
node_modules
config/development.json
config/production.json
config/test.json

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```
## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

(In case commands such as grunt or knex are not found on the terminal, type in: `export PATH="$PATH:$(yarn global bin)"`)

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

```
*** If you encounter Error: 'grunt not found' type in the terminal: ***
*** `export PATH="$PATH:$(yarn global bin)"` in the terminal ***
*** answer found in: (https://github.com/yarnpkg/yarn/issues/1321) ***

*** If you encounter Error: role "postgres" does not exist: ***
*** AND you are using postgres from Homebrew, type in the terminal: ***
*** `/usr/local/Cellar/postgresql/9.*.*/bin/createuser -s postgres` ***
*** put your version of postgres in *.*, for example 9.6.1 ***
*** answer found in: (https://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist) ***
```

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

*Not Necessary for DB creation as it rolls back db creation* `knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

```
*** if you need to rollback, run `knex migrate:rollback --env NODE_ENV` ***
```

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`



