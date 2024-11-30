Entrega clase 04 - Orquestación de contenedores & Seguridad

Primera pre-entrega de tu Proyecto final

Se debe entregarÑ

- Crear un router llamado mocks.router.js que funcione bajo la ruta base /api/mocks.

- Mover el endpoint “/mockingpets” (Desarrollado en el primer Desafío Entregable) dentro de este router.

- Crear un módulo de Mocking para generar usuarios de acuerdo a un parámetro numérico. Dichos usuarios generados deberán tener las siguientes características:

  - En “password” debe tener la contraseña “coder123” encriptada.
  - “role” puede variar entre “user” y “admin”.
  - “pets” debe ir como array vacío.

- Dentro del router mocks.router.js, utilizar este módulo en un endpoint GET llamado “/mockingusers”, y generar 50 usuarios con el mismo formato que entregaría una petición de Mongo.

- Dentro del router mocks.router.js, desarrollar un endpoint POST llamado /generateData que reciba los parámetros numéricos “users” y “pets” para generar e insertar en la base de datos la cantidad de registros indicados.

- Comprobar dichos registros insertados mediante los servicios GET de users y pets
