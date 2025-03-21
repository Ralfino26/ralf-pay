
<?php
require 'vendor/autoload.php'; // Zorg dat dit pad klopt met jouw composer setup

// Zet foutmeldingen aan voor debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Webhook URL
$webhook_url = 'https://discord.com/api/webhooks/1352621309334655076/zsGlp1v340Pd55gkdPVuqHBrs_xjavPrvKxsqYqg8LhkBhBV02Cw7IkL-58N01owFDAX';

// Verwerk callback van CryptAPI
$payment_data = CryptAPI\CryptAPI::process_callback($_GET);

if (!$payment_data['pending']) {
    $coin = strtoupper($payment_data['coin']);
    $value = $payment_data['value_coin'];
    $txid = $payment_data['txid'];

    $message = [
        "content" => "💰 *Crypto betaling ontvangen!*
Munt: {$coin}
Bedrag: {$value} {$coin}
TxID: {$txid}"
    ];

    $json_data = json_encode($message);

    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-type: application/json']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_exec($ch);
    curl_close($ch);
}

// Belangrijk: geef altijd een '200 OK' terug aan CryptAPI
http_response_code(200);
echo 'OK';
?>
