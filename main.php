<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0', shrink-to-fit=no">
    <meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
    <title>Crypto Clicker</title>
    <script src="js/Canvas.js"></script>
    <script src="js/Main.js"></script>
    <script src="js/Coin.js"></script>
    <script src="js/Drop.js"></script>
    <script src="js/Stats.js"></script>
    <script src="js/Shop.js"></script>
    <script src="js/Skin.js"></script>
    <script src="js/Error.js"></script>
    <script src="js/Background.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="manifest" href="manifest.webmanifest" />
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="wrapper">
        <div class="errorModal">
              <div>
                <h3 class="errorModal--message"></h3>
                <button class="errorModal--button">OK, Play!</button>
                </div>       
        </div>
        <div class="modal">
            <div class="modal--content">
                <div class="modal--exit"><img src="img/close.png" alt=""></div>
                <div class="modal--powerUps">
                    <h1 class='modal--powerUpsTitle'>Power Ups</h1>
                    <div class="modal--powerUpsWrapper">
                    <div class='powerUps--ac'>
                        <img class='powerUps--img' src="img/servers.png" alt="">
                        <h1>Server</h1>
                        <h2 class='powerUps--level'>Level:</h2>
                        <h2 class='powerUps--bonus'>/sec</h2>
                        <h1 class='powerUps--price'>0</h1>
                        
                    </div>
                    <div class='powerUps--cpc'>
                        <img class='powerUps--img' src="img/miner.png" alt="">
                        <h1>Miner</h1>
                        <h2 class='powerUps--level'>Level:</h2>
                        <h2 class='powerUps--bonus'>/click</h2>
                        <h1 class='powerUps--price'>0</h1>
                        
                    </div>
                    </div>
                </div>
                <div class="modal--skins">
                    <h1 class='modal--powerUpsTitle'>Skins</h1>
                    <div class="modal--skinsWrapper">

                    </div>
                </div>
            </div>
        </div>
        <canvas></canvas>
         <div class="overlay"></div>
        <div class="header">
           
            <div class="perc bonus">
                <h3>CRYPTO <br> BONUS</h3>
                <h3 class="crypto-bonus">X1</h3>

            </div>
            <div>
                <h2 class="score"></h2>
            </div>
            <div class="perc streak">
                <h3 class="streak-multi">X1</h3>
            </div>
        </div>
        <div class="bonuses">
            
            
        </div>
        <div class="menu">
            <div class="menu-button shop">
                <img src="img/shop.png" alt="">
            </div>
            <div class="menu-button clicker active">
                <img src="img/clicker.png" alt="">
            </div>
        </div>
    </div>