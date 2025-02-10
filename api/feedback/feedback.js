module.exports = async function (context, req) {
    let debugMessages = [];

    try {
        debugMessages.push("⏳ Attempting to load 'mssql' module...");

        // Try requiring 'mssql' inside the function
        let sql;
        try {
            sql = require("mssql");
            debugMessages.push("✅ 'mssql' module loaded successfully.");
        } catch (error) {
            debugMessages.push("❌ ERROR: Failed to load 'mssql' module.");
            debugMessages.push(`Message: ${error.message}`);
            debugMessages.push(`Stack: ${error.stack}`);

            context.res = {
                status: 500,
                body: JSON.stringify({
                    message: "Failed to load 'mssql' module.",
                    debug: debugMessages.join("\n")
                })
            };
            return; // Exit the function early
        }

        // Database connection config
        const config = {
            user: "mike313", // SQL username
            password: "Test1234", // SQL password
            server: "sqldbserveryolotrmk.database.windows.net", // SQL server (e.g., xyz.database.windows.net)
            database: "Feedback", // Database name
            
        };

        debugMessages.push("⏳ Attempting to connect to the database...");

        // Attempt to connect
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
