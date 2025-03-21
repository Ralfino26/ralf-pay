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
    try {
        // Genereer BTC adres
        const caBTC = new CryptAPI(coinBTC, myAddressBTC, callbackUrl, params, cryptapiParams);
        const addressBTC = await caBTC.getAddress();  // Genereer BTC adres

        // Genereer ETH adres
        const caETH = new CryptAPI(coinETH, myAddressETH, callbackUrl, params, cryptapiParams);
        const addressETH = await caETH.getAddress();  // Genereer ETH adres

        // Genereer QR codes voor beide adressen
        const qrCodeBTC = await caBTC.getQrcode(0, 512);  // BTC QR code
        const qrCodeETH = await caETH.getQrcode(0, 512);  // ETH QR code

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Crypto adressen en QR codes gegenereerd!',
                btcAddress: addressBTC,
                ethAddress: addressETH,
                qrCodeBTC: qrCodeBTC.qr_code,  // BTC QR code
                qrCodeETH: qrCodeETH.qr_code   // ETH QR code
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
