
const https = require('https');

function sendDiscordWebhook(coin, euroAmount, amount, address) {
    const cleanMessage = `Je hebt ${String(euroAmount)} euro aan ${coin.toUpperCase()} ontvangen op adres: ${String(address)}  (${String(amount)} ${coin.toUpperCase()})`;

    const data = JSON.stringify({ content: cleanMessage });

    const url = new URL("https://discord.com/api/webhooks/1353015839007182859/rwO4gmjsva2nXLJIAuUksiUf9I82Mdn-5SI58see4SXRn6jdkTAXbd2tWCzrDM4tZ7pp");
    const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, res => {
        res.on('data', d => {
            process.stdout.write(d);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

exports.handler = async (event) => {
    try {
        console.log("⛔ CALLBACK BINNEN");
        console.log("Body:", event.body);

        const body = JSON.parse(event.body || '{}');

        if (body.pending === 0) {
            const coin = body.coin || "crypto";
            const eur = body.value_coin_convert?.EUR || "Onbekend";
            const amount = body.value_coin || 0;
            const addr = body.address_in || "Onbekend";

            sendDiscordWebhook(coin, eur, amount, addr);
        }

        return {
            statusCode: 200,
            body: 'ok'
        };
    } catch (error) {
        console.error("FOUT:", error);
        return {
            statusCode: 500,
            body: 'error'
        };
    }
};
