module.exports = async function (context, req) {
    const audioSource = process.env.AUDIO_SOURCE || "https://azuremkdevst.blob.core.windows.net/audio/Risen_Soundtrack_02_The_Beach.m4a";

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            audioSource: audioSource
        })
    };
};
