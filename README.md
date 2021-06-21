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

### Register 

Method : POST

```
http://localhost:3000/api/auth/register
```

#### Body

```
{
  email : value,
  password : value
  
}

```

#### Response

```
{
    "meta": {
        "status": 200,
        "msg": "Usuario creado correctamente",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYyNDMwMDMwMCwiZXhwIjoxNjI0Mzg2NzAwfQ.WYJdZqlnEKIG5bWokabB1fkO9rzJhXlLcL367-kcgBo"
    }
}

```

### Login

Method : POST

```
http://localhost:3000/api/auth/login
```


```
{
  email : value,
  password : value
  
}

```

#### Response

```
{
    "meta": {
        "status": 200,
        "msg": "Sesion iniciada",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYyNDMwMDMwMCwiZXhwIjoxNjI0Mzg2NzAwfQ.WYJdZqlnEKIG5bWokabB1fkO9rzJhXlLcL367-kcgBo"
    }
}

```

### Headers

Para los endpoints siguientes, es necesario pasar el token en el header, de lo contrario no podra acceder a ellos


## Endpoints Characters

### Characters

Method : GET

```
http://localhost:3000/api/Characters
```

#### Response

```
{
    "meta": {
        "status": 200,
        "msg": "ok"
    },
    "data": [
        {
            "id": 1,
            "name": "Mufasa",
            "image": "https://i.imgur.com/QFC6AW4.png"
        },
        {
            "id": 2,
            "name": "Mulan",
            "image": "https://i.imgur.com/80bLmgM.png"
        },
        {
            "id": 4,
            "name": "Hercules",
            "image": "https://i.imgur.com/r7HjyBQ.jpeg"
        },
        {
            "id": 5,
            "name": "Megara",
            "image": "https://i.imgur.com/ERGwQtm.png"
        }
    ]
}

```

Tambien es posible pasar parametros de busqueda en el url, solo se acepta uno a la vez. Los parametros disponibles son los siguientes:

- name -> Nombre del personaje
- age -> Edad del personaje
- movies -> Pelicula en la que aparece el personaje



```
http://localhost:3000/api/characters?name=mulan

```

#### Response

```
{
    "meta": {
        "status": 200,
        "msg": "Ok"
    },
    "data": [
        {
            "id": 2,
            "name": "Mulan",
            "image": "https://i.imgur.com/80bLmgM.png"
        }
    ]
}


```

### Detalle de un personaje
Method : GET

Se puede acceder al detalle de un personaje de la siguiente forma

```
http://localhost:3000/api/characters/1

```

#### Response

```
{
    "meta": {
        "status": 200,
        "msg": "ok"
    },
    "data": {
        "id": 1,
        "name": "Mufasa",
        "age": 44,
        "weight": 80,
        "history": "El Rey Mufasa es un personaje principal de la película The Lion King. Es el padre de Simba, el esposo de Sarabi, el hermano mayor de Scar y el Rey de las Tierras del Reino al comienzo de la película.",
        "image": "https://i.imgur.com/QFC6AW4.png",
        "peliculas": [
            {
                "id": 1,
                "title": "The Lion King",
                "date": "1994-07-07",
                "ranking": 10,
                "image": "https://i.imgur.com/cLQMqbc.jpeg",
                "genreid": 2
            }
        ]
    }
}

```

### Crear un personaje
Method : POST

```
http://localhost:3000/api/characters/create

```

#### Body

```
{
  name : value -> string,
  age : value -> int,
  weight : value -> float,
  history : value -> string,
  image : value -> string
  
}

```

#### Response 

```
{
  meta : {
    status : 200,
    msg : "Personaje creado correctamente"
  },
  data : detalles del personaje creado
}

```

### Editar un personaje
Method : PUT  

```
http://localhost:3000/api/characters/edit/idCharacter

```

#### Body

```
{
  name : value -> string,
  age : value -> int,
  weight : value -> float,
  history : value -> string,
  image : value -> string
  
}

```

#### Response 

```
{
  meta : {
    status : 200,
    msg : "Personaje creado correctamente"
  },
  data : detalles del personaje editado
}

```

No todos los campos del Body son obligatorios, puede enviar solo los campos que quiere actualizar, en caso de algun error o de enviar algunos de los campos con información que ya esta almacenada, recibirá la siguiente respuesta:

```
{
  meta : {
    status : 500,
    msg : "Error al actualizar"
  },
  
}

```

### Eliminar un personaje
Method : DELETE

Puede eliminar un personaje de la siguiente manera
```
http://localhost:3000/api/characters/delete/
```

#### Response

```
{
  status : 200,
  msg : "Elemento borrado correctamente"
}

```

## Endpoints Movies

### Movies

Method : GET

```
http://localhost:3000/api/movies

```

#### Response

```

{
    "meta": {
        "status": 200,
        "msg": "ok"
    },
    "data": [
        {
            "id": 1,
            "title": "The Lion King",
            "image": "https://i.imgur.com/cLQMqbc.jpeg",
            "date": "1994-07-07"
        },
        {
            "id": 2,
            "title": "Mulan",
            "image": "https://i.imgur.com/HviPYwS.jpeg",
            "date": "1998-05-07"
        },
        {
            "id": 3,
            "title": "Mulan 2",
            "image": "https://i.imgur.com/aGgBsFy.png",
            "date": "2004-01-02"
        },
        {
            "id": 4,
            "title": "Hercules",
            "image": "https://i.imgur.com/AZZAjNk.jpeg",
            "date": "1997-06-27"
        }
    ]
}
```













