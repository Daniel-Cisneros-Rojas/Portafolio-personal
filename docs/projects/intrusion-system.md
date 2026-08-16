# Sistema de Detección de Intrusos

## Categoría

IoT / Backend / Aplicaciones Móviles

## Tecnologías

- ESP32
- C++
- PHP
- Kotlin
- Firebase

## Descripción Corta

Sistema de seguridad basado en IoT que utiliza sensores de movimiento,
un servidor PHP y una aplicación móvil para detectar actividad y enviar
notificaciones de intrusión en tiempo real.

## Descripción

Sistema desarrollado para monitorizar actividad mediante sensores de
movimiento conectados a un ESP32. Los datos recopilados son enviados a un
servidor PHP, encargado de procesar la información y proporcionar
notificaciones en tiempo real mediante servicios de Firebase.

La aplicación móvil, desarrollada en Kotlin, permite gestionar los registros
de actividad y monitorizar posibles intrusiones, integrando componentes de
hardware, servicios backend y una interfaz móvil.

## Características

- Detección de actividad mediante sensores de movimiento
- Integración con ESP32
- Comunicación con servidor PHP
- Notificaciones en tiempo real mediante Firebase
- Aplicación móvil desarrollada en Kotlin
- Registro y consulta de actividad
- Monitorización de posibles intrusiones
- Integración entre hardware, backend y aplicación móvil

## Arquitectura

El sistema integra tres componentes principales: el dispositivo ESP32,
responsable de recopilar la actividad de los sensores; un servidor PHP,
encargado del procesamiento de los datos; y una aplicación móvil en Kotlin,
que permite al usuario consultar la actividad y recibir notificaciones.

Firebase se utiliza como parte de la infraestructura de comunicación para
proporcionar notificaciones en tiempo real a la aplicación.

## Repositorio

https://github.com/Daniel-Cisneros-Rojas/Detector-de-intrusos 


## Imágenes

- `/images/projects/intrusion-system/cover.png`
- `/images/projects/intrusion-system/esp32.png`
- `/images/projects/intrusion-system/mobile-app.png`
- `/images/projects/intrusion-system/architecture.png`