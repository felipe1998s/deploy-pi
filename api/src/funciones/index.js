const axios = require("axios");
const {Pokemon,Type} = require("../db");
const { Op } = require("sequelize");

const fullPokemonDB=async()=>{
    const result = await Pokemon.findAll({
        include:{
            model: Type, attributes:['name'],
            through: {attributes:[]}
        }
    });

    return result;
}

const peticion = async (link) =>{
    const apiUrl = await axios.get(link);
    let result = apiUrl.data.results;
    result = detailPokemon(apiUrl,result);
    return result;
}


const detailPokemon = async (apiUrl,result) => {
    if(!apiUrl.data.previous && apiUrl.data.next){
        const resultPromise = result.map(async (pokemon)=>{
            const url = await axios.get(pokemon.url);
            const data = url.data;
            const pokemonDetail = cleanObj(data);
            return pokemonDetail;
        });    
        const dataP = Promise.all(resultPromise);
        return dataP;
        // return Promise.all(resultPromise).then((res)=>res)
    }   
}

const pokemonByNameDB = async(name) =>{
    const result = await Pokemon.findAll(
        {
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                },
            },
            include:{
                model: Type, attributes:['name'],
                through: {attributes:[]},
            },
        }
    );
    return result;
}


const cleanObj = (data) =>{
    const types = data.types.map((typeName)=>{
        const name = typeName.type.name;
        return {name};
    });
    return {
         id : data.id,
         name : data.name,
         weight : data.weight,
         life : data.stats[0].base_stat,
         attack : data.stats[1].base_stat,
         defense : data.stats[2].base_stat,
         speed : data.stats[5].base_stat,
         height : data.height,
         types,
         image : data.sprites.other.dream_world.front_default,
         createdInBD: false,
    }
}


module.exports={fullPokemonDB,pokemonByNameDB,peticion,cleanObj}