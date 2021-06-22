const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');


/*FUNCTIONS FOR CHARACTERSCONTROLLER*/ 

function formatCharacter(result) {
                
    let characters = [];

    result.forEach(character => {
        let body = {
            id : character.id,
            name : character.name,
            image : character.image
        }

        characters.push(body)
    })

    return characters
}

async function searchCharacter(body){
                
    if(body.name != undefined){
        let result =  await db.Characters.findAll({
            where : {
                name : {
                    [Op.like] :  `%${body.name}%`
                }, 
            },
            include : {
                model : db.Movies,
                through : {
                    attributes : []
                },
                as : "peliculas"
            }
        })

        return formatCharacter(result)
    }
    else if(body.age != undefined){
        let result = await db.Characters.findAll({
            where : {
                age : Number(body.age) 
            },
            include : {
                model : db.Movies,
                through : {
                    attributes : []
                },
                as : "peliculas"
            }
        })

        return formatCharacter(result)
    }
    else if(body.movies != undefined){
        let result = await db.Characters.findAll({
            include : {
                model : db.Movies,
                through : {
                    attributes : []
                },
                as : "peliculas",
                where : {
                    id : body.movies
                }
            }
        })

        return formatCharacter(result)

    }else{
        return 0
    }
}

async function createCharacter(character){
    let checkCharacter = await db.Characters.findOne({where : {name : character.name}})

    if(checkCharacter === null){
        return await db.Characters.create({
             name : character.name,
             age : Number(character.age),
             weight : character.weight,
             history : character.history,
             image : character.image
     })
    }else {
        return 0
    }

}

/*FUNCTIONS FOR MOVIESCONTROLLER*/

function formatMovies(result){
                
    let characters = [];

    result.forEach(character => {
        let body = {
            id : character.id,
            title : character.title,
            image : character.image
        }

        characters.push(body)
    })

    return characters
}

async function SearchMovies(body){
                
    if(body.title != undefined){
        let result =  await db.Movies.findAll({
            where : {
                title : {
                    [Op.like] :  `%${body.title}%`
                }, 
            },
            include : {
                model : db.Genres,
                as : "Generos"
            }
        })

        return formatMovies(result)
    }
    else if(body.genre != undefined){
        let result =  await db.Movies.findAll({
            include : {
                model : db.Genres,
                where : {
                    id : body.genre
                },
                as : "Generos"
            }
        })

        return formatMovies(result)
    }
    else if(body.order != undefined){
        let result = await db.Movies.findAll({
            order : [
                ['date', body.order]
            ]
        })

        return formatMovies(result)
    }

}

async function movieCreate(movie){
    let checkMovie = await db.Movies.findOne({where : {title : movie.title}})

    if(checkMovie === null){
        return await db.Movies.create({
             title : movie.title,
             date : movie.date,
             ranking : movie.ranking,
             image : movie.image,
             genreid : movie.genreid
     })
    }else {
        return 0
    }

}

/* FUNCTIONS FOR GENRESCONTROLLER */

async function genreCreate(genre){
    let checkMovie = await db.Genres.findOne({where : {name : genre.name}})
    console.log(checkMovie)
    if(checkMovie === null){
        return await db.Genres.create({
            name : genre.name,
            image : genre.image,
             
     })
    }else {
        return 0
    }

}



module.exports = {formatCharacter, searchCharacter, createCharacter, formatMovies, SearchMovies, movieCreate,genreCreate}