# disneyApi

API creada para el challenge de Alkemy Labs donde podra pedir información sobre personajes y películas de disney basada en el modelo REST API.

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

Para enviar un mail a la hora de que un usuario se registre, se utiliza como servicio **Sendgrid** , puede conseguir su API KEY siguiendo este [tutorial](https://docs.sendgrid.com/for-developers/sending-email/api-getting-started)

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

También es posible pasar parametros de busqueda en el url, solo se acepta uno a la vez. Los parámetros disponibles son los siguientes:

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
http://localhost:3000/api/characters/idMovie

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
                "genreid": 2,
                "Character_movie": {
                    "id": 1,
                    "characterid": 1,
                    "movieid": 1
                }
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

No todos los campos del Body son obligatorios, puede enviar solo los campos que quiere actualizar, en caso de algún error o de enviar algunos de los campos con información que ya esta almacenada, recibirá la siguiente respuesta:

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
http://localhost:3000/api/characters/delete/idMovie
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

Tambien es posible pasar parámetros de busqueda en el url, solo se acepta uno a la vez. Los párametros disponibles son los siguientes:

- title -> Nombre de la pelicula
- genre -> id del genero de la pelicula
- order -> Se aceptan los parametros ASC y DESC para ver el orden de las peliculas

```
http://localhost:3000/api/movies?title=mulan

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
            "title": "Mulan",
            "image": "https://i.imgur.com/HviPYwS.jpeg"
        },
        {
            "id": 3,
            "title": "Mulan 2",
            "image": "https://i.imgur.com/aGgBsFy.png"
        }
    ]
}


```

### Detalle de una Pelicula
Method : GET

Se puede acceder al detalle de una pelicula de la siguiente forma

```
http://localhost:3000/api/movies/idMovie

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
        "title": "The Lion King",
        "date": "1994-07-07",
        "ranking": 10,
        "image": "https://i.imgur.com/cLQMqbc.jpeg",
        "genreid": 2,
        "personajes": [
            {
                "id": 1,
                "name": "Mufasa",
                "age": 44,
                "weight": 80,
                "history": "El Rey Mufasa es un personaje principal de la película The Lion King. Es el padre de Simba, el esposo de Sarabi, el hermano mayor de Scar y el Rey de las Tierras del Reino al comienzo de la película.",
                "image": "https://i.imgur.com/QFC6AW4.png"
            }
        ]
    }
}
```


### Crear una pelicula
Method : POST

```
http://localhost:3000/api/characters/create

```

#### Body

```
{
  title : value -> string,
  date : value -> date,
  ranking : value -> float,
  image : value -> string,
  genreid : value -> int,
  
}

```

#### Response

```
{
  meta : {
    status : 200,
    msg : "Pelicula creado correctamente"
  },
  data : detalles de la pelicula creada
}

```

### Editar una Pelicula
Method : PUT  

```
http://localhost:3000/api/movies/edit/idMovie

```

#### Body

```
{
  title : value -> string,
  date : value -> date,
  ranking : value -> float,
  image : value -> string,
  genreid : value -> int,
  
}
```

#### Response 

```
{
  meta : {
    status : 200,
    msg : "Pelicula actualizada"
  },
  data : detalles de la pelicula actualizada
}

```

No todos los campos del Body son obligatorios, puede enviar solo los campos que quiere actualizar, en caso de algún error o de enviar algunos de los campos con información que ya esta almacenada, recibirá la siguiente respuesta:

```
{
  meta : {
    status : 500,
    msg : "Error al actualizar"
  },
  
}

```
### Eliminar una Pelicula
Method : DELETE

Puede eliminar una pelicula de la siguiente manera
```
http://localhost:3000/api/movies/delete/idMovie
```

#### Response

```
{
  status : 200,
  msg : "Elemento borrado correctamente"
}

```

## Endpoints Generos

### Genres

Method : GET

```
http://localhost:3000/api/genres
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
            "name": "Adventure",
            "image": "https://i.imgur.com/vBfpplz.png"
        },
        {
            "id": 2,
            "name": "Drama",
            "image": "https://i.imgur.com/PkSPUlC.jpg"
        },
        {
            "id": 3,
            "name": "Musical",
            "image": "https://i.imgur.com/YqlKvlo.jpg"
        }
    ]
}
```


### Crear un genero
Method : POST

```
http://localhost:3000/api/genres/create

```

#### Body

```
{
  name : value -> string,
  image : value -> string
  
}

```

#### Response 

```
{
  meta : {
    status : 200,
    msg : genero creado correctamente
  },
  data : {
    nombre : value,
    image : value
  }
}

```

### Editar un Genero
Method : PUT  

```
http://localhost:3000/api/genres/edit/idGenre

```

#### Body

```
{
  title : value -> string,
  image : value -> string,
}
```

#### Response 

```
{
  meta : {
    status : 200,
    msg : genero actualizado
  }
}

```

No todos los campos del Body son obligatorios, puede enviar solo los campos que quiere actualizar, en caso de algún error o de enviar algunos de los campos con información que ya esta almacenada, recibirá la siguiente respuesta:

```
{
  meta : {
    status : 500,
    msg : "Error al actualizar"
  },
  
}
```

### Eliminar un Genero
Method : DELETE

Puede eliminar un genero de la siguiente manera
```
http://localhost:3000/api/genres/delete/idGenre
```

#### Response

```
{
  status : 200,
  msg : "Elemento borrado correctamente"
}

```

## Endpoints Relations

Como un personaje puede aparecer en varias peliculas, para relacionarlos se utiliza el modelo de relacion muchos a muchos. Con el fin de logras dichas relaciones se utiliza el endpoint relations para generarlas, tendrá que realizar esta accion cada vez que cree una pelicula y un personaje que estén relacionados.


### Crear una relacion
Method : POST

```
http://localhost:3000/api/relations/create

```

#### Body

```
{
  character : character name -> string,
  movie : movie title -> string
  
}

```

Puede ver todas las relaciones creadas de la siguiente forma:


```
http://localhost:3000/api/relations

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
            "characterid": 1,
            "movieid": 1
        },
        {
            "id": 2,
            "characterid": 2,
            "movieid": 3
        },
        {
            "id": 3,
            "characterid": 2,
            "movieid": 2
        },
        {
            "id": 4,
            "characterid": 4,
            "movieid": 4
        },
        {
            "id": 5,
            "characterid": 5,
            "movieid": 4
        }
    ]
}

```

### Editar una relacion
Method : PUT  

```
http://localhost:3000/api/relations/edit/idRelation

```

#### Body

```
{
    character : character name -> string,
    movie : movie title -> string
}
```

#### Response 

```
{
  meta : {
    status : 200,
    msg :  relacion actualizada
  }
}

```

Al contrario que los casos anteriores, al actualizar una relacion es necesario todos los campos del body, de lo contrario recibirá la siguiente respuesta: 
```
{
    "meta": {
        "status": 500,
        "msg": "Los campos character y movie no pueden ser nulos"
    }
}
```

### Eliminar una Relacion
Method : DELETE

Puede eliminar una relacion de la siguiente manera
```
http://localhost:3000/api/relations/delete/idRelation
```

#### Response

```
{
  status : 200,
  msg : "Elemento borrado correctamente"
}

```






