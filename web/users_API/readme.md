# Postgres DB + Node REST API

Here you can find the documentation about this module.

## What services are available:

1. **fAInancialdb**: PostgreSQL Database for user management. This database is available in the `docker-compose` file.

   If you want to connect your DBeaver, here are the credentials required:

   - **Host**: localhost
   - **Port**: 54323
   - **Database**: fAinancial_users_db
   - **Username**: fAInancial
   - **Password**: postgres

2. **node_fainancial_api**: NodeJS REST API for user handling. This API controls how to handle user interaction with the database server and provides authentication and authorization information to access different services.

## Steps:

1. Simply run the Docker Compose file, and both services will be available. You will need to run this before running the React application.
