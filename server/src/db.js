const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

let connected = false;

const connect = async () => {
    try {
        await pool.query("SELECT 1");
        connected = true;
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
};

module.exports = {
    pool,
    connected,
    connect,
    query: (text, params) => pool.query(text, params),
};
