<?php

include "simple_html_dom.php";

header('Content-type: text/html; charset=utf-8');

$arret = $_GET["arret"];
$direction = "81$1$13";
$arret = str_replace(" ", "+", $arret);
// 81$1$13   //Essey
// 81$2$1013 //Vandoeuvre

$url = "http://www.reseau-stan.com/monitoring/index.asp?rub_code=67&pointDep=283" . $arret . "$2$54395$&line=" . $direction;
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
