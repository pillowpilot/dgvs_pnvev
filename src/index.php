<?php

require_once(__DIR__ . '/../vendor/autoload.php');

$m = new Mustache_Engine([
    'entity_flags' => ENT_QUOTES,
    'pragmas' => [Mustache_Engine::PRAGMA_BLOCKS],
    'loader' => new Mustache_Loader_FilesystemLoader(__DIR__ . '/views'),
]);

echo $m->render('index', ['index' => true]);
