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
});
