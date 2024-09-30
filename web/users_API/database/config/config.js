module.exports = {
  development: {
    username: process.env.DB_USERNAME || "fAInancial",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "fAinancial_users_db",
    host: process.env.DATABASE_HOST || "fAInancialdb",
    dialect: "postgres",
    port: process.env.DB_PORT || "5432",
  },
  test: {
    username: process.env.DB_USERNAME || "fAInancial",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "fAinancial_users_db",
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || "54321",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || "fAInancial",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "fAinancial_users_db",
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || "54321",
  },
};

