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
    array_push($tabE, $h->plaintext);
}
$error = $html->find(".error");
if (count($error) > 0) {
    array_push($tabE, $error[0]->plaintext);
}

$direction = "81$2$1013";

$url = "http://www.reseau-stan.com/monitoring/index.asp?rub_code=67&pointDep=283" . $arret . "$2$54395$&line=" . $direction;
$html = file_get_html($url);
$tabV = array();
foreach ($html->find('div.hour ul li') as $h) {
    array_push($tabV, $h->plaintext);
}
$error = $html->find(".error");
if (count($error) > 0) {
    array_push($tabV, $error[0]->plaintext);
}

$tab = array('Essey' => $tabE, 'Vandoeuvre' => $tabV);
//array_push($tab, $tabE, $tabV);
echo json_encode($tab);
