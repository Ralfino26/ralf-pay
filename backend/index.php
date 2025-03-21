<!-- filepath: c:\Users\ralfh\Documents\Websites\Ralf_Betalen\index.php -->
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betaal Ralf</title>
    <link rel="stylesheet" href="global.css">
</head>
<body>
    <h1>Hoe wil je Ralf betalen?</h1>

    <div class="section">
        <?php
        $paymentMethods = ["Overschrijving", "Crypto", "Cash"];
        foreach ($paymentMethods as $method) {
            if ($method === "Overschrijving") {
                echo "<a href='Overschrijving.php'><button>$method</button></a>";
            } elseif ($method === "Cash") {
                echo "<a href='Cash.php'><button>$method</button></a>";
            } else {
                echo "<a href='crypto.php'><button>$method</button></a>";
            }
        }
        ?>
    </div>
</body>
</html>