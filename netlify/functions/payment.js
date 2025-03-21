// Voeg dit toe bovenaan je payment.js bestand
const fetch = require('node-fetch'); // Zorg ervoor dat fetch goed geïmporteerd is

exports.handler = async function(event, context) {
    const { naam, bedrag, bericht } = JSON.parse(event.body);

    const data = {
        content: `💸 Nieuwe cashbetaling!\nNaam: ${naam}\nBedrag: €${bedrag}\nOpmerking: ${bericht}`,
    };

    try {
        const response = await fetch('https://discord.com/api/webhooks/YOUR_WEBHOOK_URL', {
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
            body: JSON.stringify({ message: 'Server error', error: error.message }),
        };
    }
};
