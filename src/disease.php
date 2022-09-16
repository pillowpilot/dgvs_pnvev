<?php

require_once(__DIR__ . '/../vendor/autoload.php');

$m = new Mustache_Engine([
    'entity_flags' => ENT_QUOTES,
    'pragmas' => [Mustache_Engine::PRAGMA_BLOCKS],
    'loader' => new Mustache_Loader_FilesystemLoader(__DIR__ . '/views'),
]);

/*
 * hantavirus: Hantavirus disease page
 * malaria: Malaria disease page
 * leptopirosis: Leptospirosis disease page
 * leishmaniasis: Leishmaniasis disease page (menu)
 * leishmaniasismucosa: Leishmaniasis mucosa page
 * leishmaniasiscutanea: Leishmaniasis cutanea page
 * leishmaniasisvisceral: Leishmaniasis visceral page
 * chagas: Chagas disease page (menu)
 * chagasagudo: Chagas acute page
 * chagascronico: Chagas chronic page
 * chagascongenito: Chagas congenital page
 */

$disease = $_GET['disease'];
$diseaseToStateMapping = [
    'leishmaniasismucosa' => [
        'title' => 'Leishmaniasis Mucosa',
        'tendenciaDataURL' => 'data/leish_mucosa_casonuevo_confirmado.json',
        'barHorizontalDataURL' => 'data/barras_horizontales_leish_mucosa_casonuevo_confirmado.json',
    ],
    'leishmaniasiscutanea' => [
        'title' => 'Leishmaniasis Cutanea',
        'tendenciaDataURL' => 'data/leish_cutanea_casonuevo_confirmado.json',
        'barHorizontalDataURL' => 'data/barras_horizontales_leish_cutanea_casonuevo_confirmado.json',
    ],
    'leishmaniasisvisceral' => [
        'title' => 'Leishmaniasis Visceral',
        'tendenciaDataURL' => 'data/leish_visceral_casonuevo_confirmado.json',
        'barHorizontalDataURL' => 'data/barras_horizontales_leish_visceral_casonuevo_confirmado.json',
    ],
];

echo $m->render('disease', [
    $disease => true, 
    'tendenciaDataURL' => $diseaseToStateMapping[$disease]['tendenciaDataURL'],
    'barHorizontalDataURL' => $diseaseToStateMapping[$disease]['barHorizontalDataURL'],
    'title' => $diseaseToStateMapping[$disease]['title'],
]);
