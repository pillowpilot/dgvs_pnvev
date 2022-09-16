import { es_lang, chartTitleStyle, chartCaptionStyle, chartYTitleStyle, chartXLabelStyle } from './utils.js';

console.log(Highcharts.getOptions().lang);

Highcharts.setOptions({
    lang: es_lang,
});

document.addEventListener('DOMContentLoaded', function () {
    fetch(tendenciaDataURL)
        .then(res => res.json())
        .then(data => {
            data = data[Object.keys(data)[0]];

            const grouped = _(data).groupBy(o => o['date']).value();
            const points = Object.keys(grouped).map(k => [k, grouped[k].length]);

            console.log(points);
            console.log(grouped);

            const chart = Highcharts.chart('tendencia', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: `Tendencia de Casos de ${diseaseTitle} (Columna 3 de la tabla de requerimientos)`,
                    style: chartTitleStyle,
                },
                xAxis: {
                    categories: Object.keys(grouped),
                    labels: {
                        style: chartXLabelStyle,
                    }
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de Casos',
                        style: chartYTitleStyle,
                    }
                },
                caption: {
                    text: '<strong>Lorem.</strong><br><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em>',
                    style: chartCaptionStyle,
                },
                series: [{
                    name: diseaseTitle,
                    data: points,
                    color: 'red'
                }]
            });
        });

    fetch(barHorizontalDataURL)
        .then(res => res.json())
        .then(data => {
            data = data[Object.keys(data)[0]];

            console.log(data);

            const possibleValues = {
                'sexo': _(data).map(o => o['Sexo'] || 'Sin Datos').uniq().value(),
                'grupoEtareo': _(data).map(o => o['GrupoEtareo'] || 'Sin Datos').uniq().value(),
            }

            console.log(possibleValues);

            const sexoValue = possibleValues['sexo'][0];
            const grupoEtareoValue = possibleValues['grupoEtareo'][0];
            const filtered = _(data)
                .filter(o => o['Sexo'] === sexoValue && o['GrupoEtareo'] === grupoEtareoValue)
                .sortBy(o => o['date'])
                .value();

            console.log(filtered);

            const grouped = _(filtered).groupBy(o => o['date']).value();
            const points = Object.keys(grouped).map(k => [k, grouped[k].length]);
            console.log(points);
            const cumulative = points.reduce((prev, curr) => {
                return [
                    ...prev,
                    [
                        curr[0],
                        (prev[prev.length - 1] || [0, 0])[1] + curr[1]
                    ]]
            }, []);
            console.log(cumulative);
            const chart = Highcharts.chart('barHorizontal', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: `Barras Horizontales de ${diseaseTitle} (Columna 4 de la tabla de requerimientos)`,
                    style: chartTitleStyle,
                },
                xAxis: {
                    categories: _(filtered).map(o => o['date']).value(),
                    labels: {
                        style: chartXLabelStyle,
                    }
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de Casos',
                        style: chartYTitleStyle,
                    }
                },
                caption: {
                    text: '<strong>Lorem.</strong><br><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em>',
                    style: chartCaptionStyle,
                },
                series: [{
                    name: diseaseTitle,
                    data: cumulative,
                    color: 'red'
                }]
            });
        });

        const data = [
            ['py-ag', 10], ['py-bq', 11], ['py-cn', 12], ['py-ph', 13],
            ['py-cr', 14], ['py-sp', 15], ['py-ce', 16], ['py-mi', 17],
            ['py-ne', 18], ['py-gu', 19], ['py-pg', 20], ['py-am', 21],
            ['py-aa', 22], ['py-cg', 23], ['py-cz', 24], ['py-cy', 25],
            ['py-it', 26], ['py-as', 27]
        ];

    fetch('data/py-all.topo.json')
        .then(res => res.json())
        .then(geojson => {
            Highcharts.mapChart('map', {
                chart: {
                    map: geojson
                },
        
                title: {
                    text: 'Demo de Mapa temático proporcional/calor (Columna 1 de la tabla de requerimientos)',
                },
        
                subtitle: {
                    text: '<strong>Paraguay</strong>'
                },
        
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
        
                colorAxis: {
                    min: 0
                },
        
                series: [{
                    data: data,
                    name: 'Datos aleatorios!',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }]
            });
        });
});
