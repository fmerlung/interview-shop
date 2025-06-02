const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

let connectionState = {
	connected: false,
	lastChecked: null
}

const connect = async () => {
    try {
        await pool.query("SELECT 1");
        connectionState = {
			connected: true,
			lastChecked: new Date()
		};
        console.log("Database connected");
    } catch (err) {
        connectionState = {
			connected: false,
			lastChecked: new Date()
		};
        console.error("Database connection error:", err.message);
    }
};

module.exports = {
    pool,
    getConnectionStatus: () => connectionState,
    connect,
    query: (text, params) => pool.query(text, params),
};
