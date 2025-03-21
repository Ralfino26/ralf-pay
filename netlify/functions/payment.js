// Gebruik dynamic import voor node-fetch
let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;

    exports.handler = async function(event, context) {
        const { naam, bedrag, bericht } = JSON.parse(event.body);

        const data = {
            content: `💸 Nieuwe cashbetaling!\nNaam: ${naam}\nBedrag: €${bedrag}\nOpmerking: ${bericht}`,
        };

        try {
            const response = await fetch('https://discord.com/api/webhooks/1352621309334655076/zsGlp1v340Pd55gkdPVuqHBrs_xjavPrvKxsqYqg8LhkBhBV02Cw7IkL-58N01owFDAX', {
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
})();
