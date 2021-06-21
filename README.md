# disneyApi

API creada para el challenge de Alkemy Labs donde podra pedir información sobre personajes y peliculas de disney basada en el modelo REST API.

## Configuración inicial

Antes de poder usar el API, es necesario exportar la base de datos y configurar las **variables de entorno** en el archivo **.env** con sus datos 

```
/*DATABASE CONNECTION*/
DATABASE_USERNAME = "your_username"
DATABASE_PASSWORD = "your_password

/* EMAIL API */
SENDGRID_API_KEY = "your_api_key"
EMAIL = "your_email"

```

Para el envio de mail a la hora de que un usuario se registre, se utiliza como servicio **Sendgrid** , puede conseguir su API KEY siguiendo este [tutorial](https://docs.sendgrid.com/for-developers/sending-email/api-getting-started)

## Endpoints
