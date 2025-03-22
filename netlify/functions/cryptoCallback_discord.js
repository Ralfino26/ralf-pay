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