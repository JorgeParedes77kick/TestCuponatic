## Tabla de contenidos

<!-- - [Descripción y contexto](#descripcion-y-contexto) -->

- [Guía de instalación](#guia-de-instalacion)
  - [Instalación y configuración back](#instalacion-y-configuracion-back)
  - [Instalación front](#instalacion-front)
- [Levantar la aplicación web de manera local](#levantar-la-aplicación-web-de-manera-local)
- [Archivo dump](#dump)

<!-- ### Descripción y contexto

--Agregar descripcion-- -->

### Guía de instalación

Primeramente, es necesario clonar el repositorio via git mediante el comando:

```
$ git clone
```

Para instalar y desplegar la aplicación web de manera local, es necesario tener ciertas dependencias instaladas previamente. Estas son:

- Mysql ![version](https://img.shields.io/badge/version->8.0.26-blue)
- NodeJs ![version](https://img.shields.io/badge/version->16.6.2-blue)
- Npm ![version](https://img.shields.io/badge/version->7.20.3-blue)
- Composer ![version](https://img.shields.io/badge/version->2.1.1-blue)
- symfony ![version](https://img.shields.io/badge/version->4.0-blue)

#### Instalación y configuración back

En la ruta de origen del proyecto ejecutar los siguientes comandos

```
$ cd ./cuponatic_back
$ symfony composer install
```

Adicionalmente es necesario tener un archivo ".env" , renombre el archivo ".env.example" por ".env" y reemplace los campos entre <> con las credenciales de su DB.

```
DATABASE_URL="mysql://<USER_NAME>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>?serverVersion=8"
```

Completado el paso anterior ejecutar los siguientes comandos

```
$ symfony console doctrine:database:create #creacion DB

$ symfony console doctrine:migrations:migrate #ejecutar migraciones

$ symfony console doctrine:migrations:migrate #ejecutar migraciones

$ symfony console csv:import #importar data según archivo entregado
```

#### Instalación Front

En la ruta de origen del proyecto ejecutar los siguientes comandos

```
$ cd ./cuponatic_front
$ npm install
```

#### Adicional

Instalar extension en su navegador que permita el acceso de cors.

En caso de estar utilizando google cromme se recomienda
[Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=es).

### Levantar la aplicación web de manera local

En cada una las rutas raices del proyecto abrir un terminal y ejecutar.

#### Back

```
$ symfony serve:start
```

#### Front

```
$ npm run dev
```

### Dump

Se dejo en la raiz del proyecto un archivo dump "dumpDBCuponatic.sql" con el respaldo de la base de datos utilizada.
