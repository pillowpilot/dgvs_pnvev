import { es_lang, chartTitleStyle, chartCaptionStyle, chartYTitleStyle, chartXLabelStyle } from './utils.js';

console.log(Highcharts.getOptions().lang);

Highcharts.setOptions({
    lang: es_lang,
});

document.addEventListener('DOMContentLoaded', function () {
    $('select[name="horizontalBars-ageGroup"]').select2({
        ajax: {
            url: 'data/leishmaniasismucosa/gruposEtareos.json',
            dataType: 'json',
        },
        placeholder: 'Grupo Etareo',
    });
    $('select[name="horizontalBars-sex"]').select2({
        ajax: {
            url: 'data/leishmaniasismucosa/sexo.json',
            dataType: 'json',
        },
        placeholder: 'Sexo',
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch(tendenciaDataURL)
        .then(res => res.json())
        .then(data => {
            data = data[Object.keys(data)[0]];
            console.log(data);

            const groupedByYear = _(data).groupBy(o => (new Date(o.date)).getFullYear()).value();
            console.log(groupedByYear);

            const x1 = _(groupedByYear).mapValues(yearData => _(yearData).countBy('epiweek').value()).value(); 
            console.log('x1', x1);
            const x2 = _(x1).mapValues((yearData, year) => ({
                name: year,
                data: _(yearData).reduce((acc, y, x) => {
                    acc.push([x, y])
                    return acc;
                }, [])
            })).value();
            console.log('x2', x2);
            const x3 = _(x2).reduce((acc, yd) => {
                acc.push(yd);
                return acc;
            }, []);
            console.log('x3', x3);

            const grouped = _(data).groupBy(o => o['date']).value();
            const points = Object.keys(grouped).map(k => [k, grouped[k].length]);
            console.log(points);
            console.log(grouped);

            let epiweeks = [];
            for(let i = 1 ; i < 53; ++i)
                epiweeks.push("" + i);
            console.log(epiweeks);

            const chart = Highcharts.chart('tendencia', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: `Tendencia de Casos de ${diseaseTitle} (Columna 3 de la tabla de requerimientos)`,
                    style: chartTitleStyle,
                },
                xAxis: {
                    categories: epiweeks,
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
                series: x3
            });

            // x3.forEach(e =>
            //     chart.addSeries(e)
            // );

            // setTimeout(() => {
            //     chart.addSeries({
            //     name: diseaseTitle,
            //     data: points,
            //     color: 'red'
            // })
            // }, 1500);
            
        });

    fetch('data/leishmaniasismucosa/barras_horizontales_leish_mucosa_casonuevo_confirmado_masculino_20-a-39.json')
        .then(res => res.json())
        .then(data => {
            // console.log('Here!');
            // console.log(data);

            const structuredData = 
                _(data)
                .groupBy(o => (new Date(o.date)).getFullYear())
                .mapValues(yearData => 
                    _(yearData)
                    .groupBy(o => o.epiweek)
                    .mapValues(l => l.length)
                    .value())
                .value()

            // console.log(
            //     'struct data',
            //     structuredData
            // );

            const seriesData = _(structuredData)
                .mapValues((yearData) => 
                    _(yearData)
                        .reduce((acc, y, x) => {
                            acc.push([x, y]);
                            return acc;
                        }, [])
                )
                .value();
            // console.log(seriesData);
            const series = _(seriesData).reduce((acc, data_, year) => {
                acc.push({name: year, data: data_})
                return acc;
            }, []);
            
            // console.log(series);

            const chart = Highcharts.chart('barHorizontal', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `Barras Horizontales de ${diseaseTitle} (Columna 4 de la tabla de requerimientos)`,
                    style: chartTitleStyle,
                },
                xAxis: {
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
                series: series
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
