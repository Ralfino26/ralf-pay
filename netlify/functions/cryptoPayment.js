const CryptAPI = require('@cryptapi/api');

// Je gegevens voor BTC en ETH
const coinBTC = 'btc';  // Cryptocurrency voor BTC
const coinETH = 'eth';  // Cryptocurrency voor ETH

// Jouw crypto-adressen
const myAddressBTC = 'bc1qjp6p7r868uhes3psc9fuk2h2z9f8ag336dt56e';  // Je BTC adres
const myAddressETH = '0x8f0C70E4255dAEACc134164daa7eC9c4795225B2';  // Je ETH adres

// Callback URL waar de betaling naar toe wordt gestuurd
const callbackUrl = 'https://statuesque-praline-9e714f.netlify.app/.netlify/functions/cryptoCallback';

// Params, zoals een order-ID of andere gegevens die je mee wilt sturen
const params = { orderId: 1234 };

// Extra cryptapi parameters
const cryptapiParams = {};  // Deze laat je leeg of voeg extra configuraties toe

// Genereer een nieuw adres voor BTC en ETH betalingen
exports.handler = async function(event, context) {
    const coin = event.queryStringParameters.coin;

    let coinType, myAddress, address, qrCode;

    if (coin === 'btc') {
        coinType = coinBTC;
        myAddress = myAddressBTC;
    } else if (coin === 'eth') {
        coinType = coinETH;
        myAddress = myAddressETH;
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Unsupported coin type' })
        };
    }

    try {
        const ca = new CryptAPI(coinType, myAddress, callbackUrl, params, cryptapiParams);
        address = await ca.getAddress();  // Genereer adres
        qrCode = await ca.getQrcode(0, 512);  // Genereer QR code

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${coinType.toUpperCase()} Adres en QR code gegenereerd!`,
                [`${coin}Address`]: address,
                [`qrCode${coin.toUpperCase()}`]: qrCode.qr_code  // Dynamisch op basis van de coin
            })
        };
    } catch (error) {
        console.error("Fout bij het genereren van het adres:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Fout bij het genereren van het adres', error: error.message })
        };
    }
};
