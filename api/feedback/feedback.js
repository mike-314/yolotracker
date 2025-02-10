const sql = require("mssql");

module.exports = async function (context, req) {
    let debugMessages = [];

    try {
        debugMessages.push("⏳ Attempting to load 'mssql' module...");

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
            return;
        }

        // ✅ Use JDBC-style connection settings
        const config = {
            server: "sqldbserveryolotrmk.database.windows.net",
            database: "yolotracker_mk",
            authentication: {
                type: "default",
                options: {
                    userName: "mike313@sqldbserveryolotrmk",
                    password: "Test1234"
                }
            },
            options: {
                encrypt: true,
                trustServerCertificate: false,
                loginTimeout: 30,
                hostNameInCertificate: "*.database.windows.net"
            }
        };

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
