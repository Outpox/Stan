<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css"/>
    <title>Horaires Stan</title>
</head>
<body>
<p>Vous êtes au : <span id="addr"></span></p>

<p>L'arrêt de tram le plus proche de vous est : <strong id="arret"></strong><span id="dist"></span></p>

<div id="horaires">
    <img src="ajax-loader.gif" id="loading" style="display:none;"/>
    <code id="passagesE"></code>
    <hr id="hr" style="display:none;"/>
    <code id="passagesV"></code>
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