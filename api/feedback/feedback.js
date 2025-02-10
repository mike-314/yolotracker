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
            debugMessages.push(`❌ ERROR: Failed to load 'mssql' module.`);
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

        const config = {
            server: process.env.DB_SERVER, 
            database: process.env.DB_NAME,
            authentication: {
                type: "default",
                options: {
                    userName: process.env.DB_USER, 
                    password: process.env.DB_PASS 
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

        // ✅ Validate Request Body
        const feedbackText = req.body?.feedback;
        if (!feedbackText || feedbackText.trim() === "") {
            debugMessages.push("❌ ERROR: No feedback provided.");
            context.res = {
                status: 400,
                body: JSON.stringify({
                    message: "Feedback cannot be empty.",
                    debug: debugMessages.join("\n")
                })
            };
            return;
        }

        debugMessages.push(`⏳ Inserting feedback: "${feedbackText}" into the database...`);

        // ✅ Insert Feedback into the Database Using a Parameterized Query
        const request = new sql.Request();
        request.input("feedbackText", sql.NVarChar, feedbackText);
        await request.query(`
            INSERT INTO Feedback (FeedbackText) VALUES (@feedbackText)
        `);

        debugMessages.push("✅ Feedback inserted successfully!");

        context.res = {
            status: 200,
            body: JSON.stringify({
                message: "Feedback saved successfully!",
                debug: debugMessages.join("\n")
            })
        };
    } catch (err) {
        debugMessages.push("❌ ERROR: Failed to insert feedback.");
        debugMessages.push(`Message: ${err.message}`);
        debugMessages.push(`Code: ${err.code || "UNKNOWN_ERROR"}`);
        debugMessages.push(`Stack: ${err.stack}`);

        context.res = {
            status: 500,
            body: JSON.stringify({
                message: "Failed to save feedback.",
                debug: debugMessages.join("\n")
            })
        };
    }
};
