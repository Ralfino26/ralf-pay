
// Gebruik dynamic import voor node-fetch
let fetch;
require('dotenv').config(); // Laad variabelen uit .env

exports.handler = async function(event, context) {
    if (!fetch) {
        fetch = (await import('node-fetch')).default; // Dynamisch importeren van fetch
    }

    const { naam, bedrag, bericht } = JSON.parse(event.body);

    const data = {
        content: `💸 Nieuwe cashbetaling!\nNaam: ${naam}\nBedrag: €${bedrag}\nOpmerking: ${bericht}`,
    };

    // Haal webhook URL uit environment variable
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Webhook URL ontbreekt in .env' }),
        };
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Payment sent to Discord' }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error sending to Discord' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Fetch failed', error: error.message }),
        };
    }
};
