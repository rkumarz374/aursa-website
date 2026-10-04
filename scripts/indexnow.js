import https from 'https';

const host = 'aursa.app';
const key = 'aursa942b0e71864f3c25d81e0a71f49';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
    `https://${host}/`,
    `https://${host}/retail`,
    `https://${host}/app`,
    `https://${host}/personal-style-intelligence`,
    `https://${host}/smart-fitting-room`,
    `https://${host}/fitting-room-intelligence`,
    `https://${host}/fitting-room-analytics`,
    `https://${host}/in-store-personalization`,
    `https://${host}/about`,
    `https://${host}/contact`,
    `https://${host}/privacy`,
    `https://${host}/insights`,
    `https://${host}/ai-outfit-check`,
    `https://${host}/outfit-second-opinion`,
    `https://${host}/outfit-check-for-occasions`,
    `https://${host}/retail-pilot`,
    `https://${host}/blog/stop-dressing-for-trends-start-dressing-like-yourself`,
    `https://${host}/blog/the-psychology-of-outfit-confidence`,
    `https://${host}/blog/the-rise-of-ai-style-intelligence`,
    `https://${host}/blog/what-makes-an-outfit-feel-right`,
    `https://${host}/blog/why-your-closet-feels-disconnected`
];

const payload = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList
});

function submitToIndexNow(endpointHost) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: endpointHost,
            port: 443,
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                console.log(`IndexNow (${endpointHost}): HTTP ${res.statusCode} ${res.statusMessage}`);
                resolve({ endpoint: endpointHost, statusCode: res.statusCode, body });
            });
        });

        req.on('error', (e) => {
            console.error(`IndexNow (${endpointHost}) Error:`, e.message);
            reject(e);
        });

        req.write(payload);
        req.end();
    });
}

async function run() {
    console.log(`Submitting ${urlList.length} canonical URLs to IndexNow endpoints...`);
    try {
        await submitToIndexNow('api.indexnow.org');
        await submitToIndexNow('www.bing.com');
        console.log('IndexNow submission process complete.');
    } catch (err) {
        console.error('IndexNow submission encountered an error:', err);
    }
}

run();
