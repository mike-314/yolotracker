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
        // Connect to the database
        await sql.connect(config);

        // Insert feedback into the database
        await sql.query(
            `INSERT INTO Feedback (FeedbackText) VALUES ('${feedbackText}')`
        );

        context.log("Feedback saved:", feedbackText);

        // Respond with success
        context.res = {
            status: 200,
            body: JSON.stringify({ message: "Feedback saved successfully!" })
        };
    } catch (err) {
        context.log.error("Error saving feedback:", {
            message: err.message,
            stack: err.stack
        });

        // Respond with an error as valid JSON
        context.res = {
            status: 500,
            body: JSON.stringify({
                message: "Failed to save feedback.",
                error: err.message,
                stack: err.stack
            })
        };
    }
};
