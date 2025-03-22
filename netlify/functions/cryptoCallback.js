exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        // Dit is waar de callback van CryptAPI binnenkomt
        const paymentInfo = JSON.parse(event.body);
        console.log("Betaling ontvangen:", paymentInfo);

        // Je kunt hier de betaling verwerken, bijvoorbeeld de status controleren
        // of opslaan in je database

        // Stuur een succesbericht terug
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Betaling ontvangen en verwerkt!' })
        };
    }

    // Als het geen POST request is, stuur dan een fout terug
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' })
    };
};


// 📩 Discord webhook integratie
const https = require('https');

function sendDiscordWebhook(euroAmount, btcAmount, address) {
    const webhookUrl = "https://discord.com/api/webhooks/1353015839007182859/rwO4gmjsva2nXLJIAuUksiUf9I82Mdn-5SI58see4SXRn6jdkTAXbd2tWCzrDM4tZ7pp";
    const data = JSON.stringify({
        content: `💸 Je hebt €${euroAmount} aan Bitcoin ontvangen op adres ${address} (${btcAmount} BTC)`
    });

    const url = new URL(webhookUrl);
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
