<!DOCTYPE html>
<html lang="fr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="UTF-8">
    <meta name="description" content="Accédez rapidement aux horaires des prochains passages de tram à Nancy grâce à Chrono'Stan et son service de géolocalisation." />
    <meta name="keywords" content="stan, réseau, transport, commun, Nancy, communauté, agglomération, nancéienne, bus, bhns, tramway, vélo, stanway, stanbus, stanexpress, mobistan, p'tit stan, taxistan, handistan, correspondance, trajet, itinéraire, e-boutique,  offre, voyageur, titre, ticket, déplacement, gare, routière, échange, pôle, SNCF, TER, transport en commun, transport urbain, réseau bus, ligne, régulière, service, scolaire, école primaire, collège, lycée, zone, industrielle, architecture, patrimoine," />
    <meta name="Publisher" content="Robin Pierrot & Guillaume Migeon" />
    <link type="image/png" href="/image/favicon.png" rel="icon" /> 
    <link rel="stylesheet" href="/css/index.css"/>
    <link rel="stylesheet" href="/css/addtohomescreen.css"/>
    <title>Chrono'Stan - Horaires de tram de Nancy</title>

    <!--- Viewport tweaks -->
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Chrono'Stan">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">

    <!-- Windows 8 et windows phone-->
    <meta name="application-name" content="Chrono'Stan"/>
    <meta name="msapplication-TileColor" content="#000000"/>
    <meta name="msapplication-square70x70logo" content="image/windows-tiny.png"/>
    <meta name="msapplication-square150x150logo" content="image/windows-square.png"/>
    <meta name="msapplication-wide310x150logo" content="image/windows-wide.png"/>
    <meta name="msapplication-square310x310logo" content="image/windows-large.png"/>
    <meta name="msapplication-tap-highlight" content="no"/> 

    <!-- Apple touch icons -->
    <link rel="apple-touch-icon-precomposed" href="image/apple-touch-icon-152x152-precomposed.png" sizes="152x152">
    <link rel="apple-touch-icon-precomposed" href="image/apple-touch-icon-120x120-precomposed.png" sizes="120x120">
    <link rel="apple-touch-icon-precomposed" href="image/apple-touch-icon-76x76-precomposed.png" sizes="76x76">
    <link rel="apple-touch-icon-precomposed" href="image/apple-touch-icon-precomposed.png">
    <link rel="apple-touch-icon" href="image/apple-touch-icon-152x152-precomposed.png" sizes="152x152">

    <!-- Apple load image -->
    <!-- iPad, retina, portrait -->
    <link href="image/apple-touch-startup-image-1536x2008.png" 
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">
    <!-- iPad, retina, landscape -->
    <link href="image/apple-touch-startup-image-1496x2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">
    <!-- iPad, portrait -->
    <link href="image/apple-touch-startup-image-768x1004.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">
    <!-- iPad, landscape -->
    <link href="image/apple-touch-startup-image-748x1024.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">
    <!-- iPhone 5 -->
    <link href="image/apple-touch-startup-image-640x1096.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">
    <!-- iPhone, retina -->
    <link href="image/apple-touch-startup-image-640x920.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">
    <!-- iPhone -->
    <link href="image/apple-touch-startup-image-320x460.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">

    <!-- Facebook -->
    <meta property="og:title" content="ChronoStan">
    <meta property="og:type" content="website">
    <meta property="og:description" content="Accédez rapidement aux horaires des prochains passages de tram à Nancy grâce à Chrono'Stan et son service de géolocalisation.">
    <meta property="og:image" content="http://chronostan.fr/image/share2.png">
    <meta property="og:url" content="http://chronostan.fr/">
    <meta property="og:site_name" content="Chrono'Stan">
    <meta property="fb:admins" content="1614882856">

    <!-- Google+ -->
    <meta itemprop="name" content="ChronoStan">
    <meta itemprop="description" content="Accédez rapidement aux horaires des prochains passages de tram à Nancy grâce à Chrono'Stan et son service de géolocalisation.">
    <meta itemprop="image" content="http://chronostan.fr/image/share2.png">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@CBRPLX">
    <meta name="twitter:title" content="ChronoStan">
    <meta name="twitter:description" content="Accédez rapidement aux horaires des prochains passages de tram à Nancy grâce à Chrono'Stan et son service de géolocalisation.">
    <meta name="twitter:creator" content="@CBRPLX">
    <meta name="twitter:image:src" content="http://chronostan.fr/image/share2.png">

    <script src="/js/addtohomescreen.js?v=4"></script>
    <script>
      addToHomescreen();
    </script>
</head>
<body>
    <div class="bloc-container proxima">
        <div class="bloc bloc-header txtcenter">
            <a href="/"><img src="/image/logo.png" alt="Logo Chrono'Stan : les horaires de tram de Nancy" /></a>
        </div>
        <div class="bloc bloc-position bloc-about">
            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-lamp txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">Pourquoi ?</span>

                <div class="hr"></div>
                <div class="ss-bloc-like proxima">
                    Vous habitez Nancy et vous prenez le tram tous les jours ? 
                    Vous en avez-marre de la lenteur du site de Stan ? Vous le trouvez trop compliqué ? 
                    Vous avez raté votre tram d'une minute à peine ?<br/><br/>
                    Ce sont aussi des problèmes que nous avons rencontrés et qui nous ont posé problème. 
                    Alors comme on dit, <span class="italic">aux grands maux les grands remèdes</span> ! 
                    C'est pourquoi nous avons décidé de développer notre application qui nous afficherait le plus rapidement possible
                    les horaires du tram le plus proche. On utilise donc la géolocalisation pour gagner du temps.<br/><br/>
                    Que vous soyez à Mont désert, Blandan, Gare ou Point central, l'application vous trouve et vous donne les horaires plus rapidement que 
                    n'importe quelle autre application !
                </div>
            </div>

            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-tech txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">Comment ?</span>

                <div class="hr"></div>
                <div class="ss-bloc-like proxima">
                    Chuuuuut ! C'est secret ...
                </div>
            </div>

            <div class="ss-bloc proxima-bold">
                <span class="col txtmiddle"><span class="icone-guy txtmiddle"></span></span>
                <span class="txtmiddle uppercase col">Qui ?</span>

                <div class="hr"></div>
                <div class="ss-bloc-like proxima creators">
                    <div class="col">
                        <div class="col txtmiddle">
                            <span class="icone-guillaume-migeon"></span>
                        </div>
                        <div class="col txtmiddle creators-infos">
                            <div class="proxima-bold uppercase">Guillaume Migeon</div>
                            <div>21 ans, Étudiant MIAGE</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="col txtmiddle">
                            <span class="icone-robin-pierrot"></span>
                        </div>
                        <div class="col txtmiddle creators-infos">
                            <div class="proxima-bold uppercase">Robin pierrot</div>
                            <div>21 ans, Chef de projet</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bloc bloc-footer txtcenter">
            <span class="txtmiddle">
                Made with 
            </span>
            <span class="icone-coeur txtmiddle"></span>
            <span class="txtmiddle"> 
                by <a href="https://github.com/Outpox" target="_blank" new-window="1">@outpox</a> 
                & <a href="https://cbrplx.com/" target="_blank" new-window="1">@cbrplx</a>
            </span>
        </div>
    </div>
<script>
if(window.location.host == "chronostan.fr" || window.location.host == "www.chronostan.fr"){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-58801623-1', 'auto');
  ga('send', 'pageview');
}

</script>
</body>
</html>