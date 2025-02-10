module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: JSON.stringify({
            audioSource: process.env.AUDIO_SOURCE || "https://yourstorageaccount.blob.core.windows.net/music/default.mp3"
        })
    };
};
