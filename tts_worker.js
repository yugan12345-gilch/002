export default {
    async fetch(request) {
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }
        try {
            const { text } = await request.json();
            const ttsUrl = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4';
            const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'>${text}</voice></speak>`;
            const response = await fetch(ttsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3' },
                body: ssml
            });
            return new Response(response.body, { headers: { 'Content-Type': 'audio/mpeg', 'Access-Control-Allow-Origin': '*' } });
        } catch {
            return new Response('Error', { status: 500 });
        }
    }
};
