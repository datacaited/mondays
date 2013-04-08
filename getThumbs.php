<?php

$url  = "http://api.flickr.com/services/rest/";
$url .= "?method=flickr.photos.search";
$url .= "&api_key=67a1df6cbf41bce3fed14b5a86656caf";
$url .= "&text=".$_POST['text'];
$url .= "&per_page=40";
$url .= "&min_taken_date=".strtotime("last monday 12:01AM");
$url .= "&max_taken_date=".strtotime("last monday 11:59PM");
$url .= "&extras=date_taken";
$url .= "&format=rest";

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
$curlResponse = curl_exec($ch);
curl_close($ch);

$xmlObject = simplexml_load_string($curlResponse);
header('Content-Type: text/xml');

print $xmlObject->asXML();

?>
