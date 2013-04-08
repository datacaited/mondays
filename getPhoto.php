<?php

$url  = "http://api.flickr.com/services/rest/";
$url .= "?method=flickr.photos.getInfo";
$url .= "&api_key=67a1df6cbf41bce3fed14b5a86656caf";
$url .="&photo_id=".$_POST['photoId'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
$curlResponse = curl_exec($ch);
curl_close($ch);

$xmlObject = simplexml_load_string($curlResponse);
header('Content-Type: text/xml');

print $xmlObject->asXML();


?>
