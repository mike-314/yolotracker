module.exports = async function (context, req) {
    // Extract the feedback text from the request body
    const feedbackText = req.body?.feedback || "No feedback provided";

    // Log the feedback (for debugging)
    context.log("Received feedback:", feedbackText);

    // Respond with success
    context.res = {
        status: 200,
        body: { message: "Feedback received successfully!" }
    };
};