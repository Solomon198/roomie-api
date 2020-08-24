"use strict";

const {
    dbHost,
    dbPort,
    dbName,
    DB_PASSWORD,
    DB_NAME,
    DB_USER
} = process.env;


module.exports.mongoConnectionString = `mongodb://localhost/db`;
