
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Cashbetaling aan Ralf</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 40px;
            text-align: center;
        }
        form {
            background: #fff;
            display: inline-block;
            padding: 30px;
            border-radius: 8px;
        }
        input, textarea {
            display: block;
            width: 300px;
            margin: 10px auto;
            padding: 10px;
            font-size: 16px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        .success {
            color: green;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Cashbetaling voor Ralf</h1>

    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $naam = htmlspecialchars($_POST["naam"]);
        $bedrag = htmlspecialchars($_POST["bedrag"]);
        $bericht = htmlspecialchars($_POST["bericht"]);

        $data = [
            "content" => "💸 Nieuwe cashbetaling!\nNaam: " . ($naam ?: "Onbekend") . "\nBedrag: €" . $bedrag . "\nOpmerking: " . ($bericht ?: "-")
        ];

        $json_data = json_encode($data);

        $ch = curl_init("https://discord.com/api/webhooks/1352621309334655076/zsGlp1v340Pd55gkdPVuqHBrs_xjavPrvKxsqYqg8LhkBhBV02Cw7IkL-58N01owFDAX");
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-type: application/json']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            echo "<p class='success' style='color:red;'>Fout bij versturen naar Discord: $error</p>";
        } else {
            echo "<p class='success'>Bedankt! Je betaling werd gemeld.</p>";
        }
    }
    ?>

    <form method="POST" action="">
        <input type="text" name="naam" placeholder="Je naam (optioneel)">
        <input type="number" name="bedrag" placeholder="Bedrag (€)" required>
        <textarea name="bericht" placeholder="Bericht (optioneel)"></textarea>
        <button type="submit">Verstuur</button>
    </form>
</body>
</html>
