export default {
    async fetch(request) {
        // 只接受 POST 请求
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }
        
        try {
            const { text } = await request.json();
            if (!text) {
                return new Response('Missing text', { status: 400 });
            }
            
            // Edge-TTS 的公开接口
            const ttsUrl = `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4`;
            
            // 请求头（模拟 Edge 浏览器）
            const headers = {
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            };
            
            // SSML 格式的请求体（指定音色为微软晓晓）
            const ssml = `
                <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>
                    <voice name='zh-CN-XiaoxiaoNeural'>
                        ${text}
                    </voice>
                </speak>
            `;
            
            const response = await fetch(ttsUrl, {
                method: 'POST',
                headers: headers,
                body: ssml,
            });
            
            if (!response.ok) {
                return new Response('TTS failed', { status: 500 });
            }
            
            // 返回音频流
            return new Response(response.body, {
                headers: {
                    'Content-Type': 'audio/mpeg',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            
        } catch (error) {
            return new Response('Error', { status: 500 });
        }
    },
};
语法错误
