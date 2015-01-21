<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <script src="js/index.js"></script>
    <link rel="stylesheet" href="css/index.css"/>
    <title>Horaires Stan</title>
</head>
<body>
    <div class="bloc-container proxima">
        <div class="bloc bloc-header txtcenter">
            <img src="image/logo.png" />
        </div>
        <div class="bloc bloc-position">
            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-position txtmiddle"></span></span>
                <span class="txtmiddle uppercase col" id="addr"></span>
            </div>
        </div>

        <div class="bloc bloc-tram">
            <div class="ss-bloc proxima-bold uppercase">
                <span class="col txtmiddle"><span class="icone-tram txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">
                    Le + proche : <strong id="arret"></strong><span id="dist"></span>
                </span>
            </div>
        </div>
        <div class="bloc bloc-essey">
            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-droite txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">DIR. ESSEY-MOUZIMPRE</span>
                <div class="hr"></div>
                <div class="passages uppercase" id="passagesE">
                    <div class="loading txtcenter">
                        <span class="icone-loading rotating"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bloc bloc-chu">
            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-gauche txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">DIR. CHU-BRABOIS</span>
                <div class="hr"></div>
                <div class="passages uppercase" id="passagesV">
                    <div class="loading txtcenter">
                        <span class="icone-loading rotating"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-50661645-3', 'auto');
    ga('send', 'pageview');

</script>
</body>
</html>