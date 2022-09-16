# Archivo

**bk_Chagas_Leish.sql**: Contiene datos a ser importados a la base de datos dgvsops

# Tablas

## frm_fchagas: 
- Filas ~ 1750
- Columnas ~ 280

## frm_fleishmaniasis:  
- Filas ~ 980
- Columnas ~ 250

### Columnas Destacadas
- ClasificacionFinal (CONFIRMADO ~ 300, SD, DESCARTADO, PENDIENTE, SOSPECHOSO).
- TipoFicha (VICERALH ~ 727, CUTANEA ~ 203, MUCOSA ~ 120)
- Departamento_descContagio (SIN DATOS ~ 731, CENTRAL ~ 56, ...)
- TipoEntrada (SD ~ 147, Caso Nuevo ~ 169, [NULL] ~ 727, ...)

## Queries

### Grafico de Tendencia de tiempo por S.E. (Leishmaniasis)
`SELECT e.date , e.epiweek 
FROM frm_fleishmaniasis ff
INNER JOIN epiweek e 
ON DATE(ff.FechaCarga) = e.date
WHERE ff.ClasificacionFinal = 'CONFIRMADO'
AND ff.TipoEntrada = 'Caso Nuevo'
AND ff.TipoFicha = 'VICERALH'`

### Barras horizontales por rango de edad y sexo
`

`