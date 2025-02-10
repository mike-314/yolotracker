module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: JSON.stringify({
            audioSource: process.env.AUDIO_SOURCE || "https://azuremkdevst.blob.core.windows.net/audio/Risen_Soundtrack_02_The_Beach.m4a"
        })
    };
};
