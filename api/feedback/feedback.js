const sql = require("mssql");

const config = {
    user: process.env.DB_USER,        // SQL username
    password: process.env.DB_PASS,    // SQL password
    server: process.env.DB_SERVER,    // SQL server (e.g., xyz.database.windows.net)
    database: process.env.DB_NAME,    // Database name
    options: {
        encrypt: true,                // Use encryption for Azure SQL
        enableArithAbort: true
    }
};

module.exports = async function (context, req) {
    const feedbackText = req.body?.feedback || "No feedback provided";

    try {
        let debugMessages = [];

        debugMessages.push("Attempting to connect to the database...");
        await sql.connect(config);
        debugMessages.push("Connection successful.");

        debugMessages.push("Inserting feedback...");
        await sql.query(
            `INSERT INTO Feedback (FeedbackText) VALUES ('${feedbackText}')`
        );
        debugMessages.push("Feedback saved successfully.");

        context.res = {
            status: 200,
            body: JSON.stringify({ message: "Feedback saved successfully!" })
        };
    } catch (err) {
        let errorDetails = `
        🚨 ERROR: Failed to save feedback 🚨
        Message: ${err.message}
        Code: ${err.code || "UNKNOWN_ERROR"}
        Stack: ${err.stack}
        `;

        context.res = {
            status: 500,
            body: JSON.stringify({
                message: "Failed to save feedback.",
                debug: errorDetails // Return full error message
            })
        };
    }
};
