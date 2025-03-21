
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Crypto Betaling</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 40px;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            margin: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        #result {
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>Betaal Ralf met Crypto</h1>
    <p>Kies een munt:</p>
    <form method="GET" action="">
        <button type="submit" name="coin" value="btc">Bitcoin</button>
        <button type="submit" name="coin" value="eth">Ethereum</button>
        <button type="submit" name="coin" value="sol">Solana</button>
    </form>

    <div id="result">
    <?php
    if (isset($_GET['coin'])) {
        require '../vendor/autoload.php'; // Zorg dat composer autoload klopt

        $coin = $_GET['coin'];
        $addresses = [
            'btc' => 'bc1qjp6p7r868uhes3psc9fuk2h2z9f8ag336dt56e',
            'eth' => '0x8f0C70E4255dAEACc134164daa7eC9c4795225B2',
            'sol/sol' => '6zFJTGF62RmaMU17hdbL6c7yRvch6937PWy1KgDjaxSL'
        ];
        $callback_url = 'https://jouwsite.com/crypto_callback.php';

        if (array_key_exists($coin, $addresses)) {
            try {
                $ca = new CryptAPI\CryptAPI($coin, $addresses[$coin], $callback_url);
                $payment_address = $ca->get_address();
                echo "<h3>Stuur je betaling naar dit adres:</h3>";
                echo "<p><strong>$payment_address</strong></p>";
                echo "<p>Je krijgt een melding zodra de betaling binnenkomt.</p>";
            } catch (Exception $e) {
                echo "<p style='color:red;'>Fout bij genereren adres: " . $e->getMessage() . "</p>";
            }
        } else {
            echo "<p style='color:red;'>Onbekende coin gekozen.</p>";
        }
    }
    ?>
    </div>
</body>
</html>
