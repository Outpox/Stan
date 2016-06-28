<?php

include "simple_html_dom.php";

header('Content-type: text/html; charset=utf-8');

$arret = $_GET["arret"];
$arret = str_replace(" ", "+", $arret);

//Directions:
// 1 = Essey
// 2 = Vandœuvre

$pointDep = 0; // LogicalId de l'arrêt
$arretDep = ''; // Title de l'arrêt
$direction = 0; // Voir directions
$localityCode = '54395'; // Semble être constant pour les trams
$line = 81; // = Tram
$arretId = 0; // ID de l'arrêt

//Exemple pour Exelmans :
//$pointDep = 277
//$arretDep = 'Exelmans'
//$arretId = 1011
//http://www.reseau-stan.com/monitoring/index.asp?rub_code=67&pointDep=277$Exelmans$2$54395&line=81$2$1011

$url = "http://www.reseau-stan.com/monitoring/index.asp?rub_code=67&pointDep=" . $pointDep . "$" . $arretDep . "$" . $direction . "$" . $localityCode . "$&line=" . $line . "$" . $direction . "$" . $arretId;

$html = file_get_html($url);
$tabE = array();
foreach ($html->find('div.hour ul li') as $h) {
    $txt = $h->plaintext;
	$txt = preg_replace("/direction/i", "", $txt);
	$txt = preg_replace("/essey/i", "", $txt);
	$txt = preg_replace("/mouzimpre/i", "", $txt);
    array_push($tabE, $txt);
}

$errorE = array();
$error = $html->find(".error");
if (count($error) > 0) {
	if(!empty($error[0]->plaintext)){
		$txt = $error[0]->plaintext;
		$txt = preg_replace("/:/i", "", $txt);
    	array_push($errorE, $txt);
    }
}
$direction = "81$2$1013";

$url = "http://www.reseau-stan.com/monitoring/index.asp?rub_code=67&pointDep=283" . $arret . "$2$54395$&line=" . $direction;
$html = file_get_html($url);
$tabV = array();
foreach ($html->find('div.hour ul li') as $h) {
	$txt = $h->plaintext;
	$txt = preg_replace("/direction/i", "", $txt);
	$txt = preg_replace("/chu/i", "", $txt);
	$txt = preg_replace("/brabois/i", "", $txt);

    array_push($tabV, $txt);
}

$errorV = array();
$error = $html->find(".error");
if (count($error) > 0) {
	if(!empty($error[0]->plaintext)){
		$txt = $error[0]->plaintext;
		$txt = preg_replace("/:/i", "", $txt);
    	array_push($errorV, $txt);
    }
}

$tab = array('Essey' => $tabE, 'Vandoeuvre' => $tabV, 'ErrorE' => $errorE, 'ErrorV' => $errorV);
//array_push($tab, $tabE, $tabV);
echo json_encode($tab);
