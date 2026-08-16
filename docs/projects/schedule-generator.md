# Organizador de Horarios FCC

## Categoría

Desarrollo Web / Procesamiento de Datos

## Tecnologías

- React
- JavaScript

## Descripción Corta

Aplicación web desarrollada con React que analiza la oferta académica oficial
de la FCC y genera combinaciones de horarios válidas según las materias y
preferencias de horario seleccionadas por el usuario.

## Descripción

Organizador de Horarios FCC es una aplicación web orientada a facilitar la
planificación académica mediante el análisis de la oferta de cursos
publicada en formato PDF.

La aplicación procesa la información contenida en el documento para
obtener los datos de las materias y permitir al usuario aplicar filtros
personalizados, seleccionar las asignaturas de interés y establecer el
intervalo de horas en el que desea asistir.

Posteriormente, un algoritmo de detección de colisiones analiza las
combinaciones disponibles y genera únicamente configuraciones de horario
válidas, representándolas mediante una gráfica en la que los días se
distribuyen en el eje X y las horas en el eje Y.

## Características

- Procesamiento de la oferta académica a partir de archivos PDF
- Selección personalizada de materias
- Filtros por intervalo de horario
- Detección de empalmes entre materias
- Generación de combinaciones de horarios válidas
- Representación gráfica de los horarios
- Interfaz dinámica desarrollada con React
- Visualización interactiva de las configuraciones generadas

## Funcionamiento

1. El sistema analiza el PDF con la oferta académica oficial.
2. Extrae y procesa la información de las materias.
3. El usuario selecciona las asignaturas que desea considerar.
4. Se establece el intervalo de horario preferido.
5. El algoritmo analiza las posibles combinaciones y descarta los horarios
   con empalmes.
6. La aplicación muestra las configuraciones válidas mediante una
   representación gráfica del horario.


## Repositorio

https://github.com/Daniel-Cisneros-Rojas/Organizador_Horarios_fcc


## Imágenes

- `/images/projects/schedule-generator/cover.png`
- `/images/projects/schedule-generator/filters.png`