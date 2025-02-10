let sql;
try {
    sql = require("mssql");
    console.log("✅ 'mssql' module loaded successfully.");
} catch (error) {
    console.error("❌ ERROR: Failed to load 'mssql' module.");
    console.error(error.message);
}

const config = {
    user: process.env.DB_USER, // SQL username
    password: process.env.DB_PASS, // SQL password
    server: process.env.DB_SERVER, // SQL server (e.g., xyz.database.windows.net)
    database: process.env.DB_NAME, // Database name
    options: {
        encrypt: true, // Use encryption for Azure SQL
        enableArithAbort: true
    }
};

module.exports = async function (context, req) {
    let debugMessages = [];

    try {
        debugMessages.push("⏳ Attempting to connect to the database...");
        
        await sql.connect(config);

        debugMessages.push("✅ Connection successful.");

        context.res = {
            status: 200,
            body: JSON.stringify({
                message: "Database connection successful!",
                debug: debugMessages.join("\n")
            })
        };
    } catch (err) {
        debugMessages.push("❌ ERROR: Failed to connect to the database.");
        debugMessages.push(`Message: ${err.message}`);
        debugMessages.push(`Code: ${err.code || "UNKNOWN_ERROR"}`);
        debugMessages.push(`Stack: ${err.stack}`);

        context.res = {
            status: 500,
            body: JSON.stringify({
                message: "Failed to connect to the database.",
                debug: debugMessages.join("\n")
            })
        };
    }
};
