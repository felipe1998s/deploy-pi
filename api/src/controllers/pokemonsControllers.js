const {Pokemon,Type} = require("../db");
const axios = require("axios");
const url = "https://pokeapi.co/api/v2/pokemon?limit=40";
const urlid = "https://pokeapi.co/api/v2/pokemon";

const {fullPokemonDB,peticion,cleanObj,pokemonByNameDB}=require("../funciones/index");

const getApiData = async () =>{
    const dataApiPokemons  = await peticion(url);
    const databasePokemons = await fullPokemonDB();
    if(!databasePokemons.length){
        return dataApiPokemons;
    }else{
        return databasePokemons.concat(dataApiPokemons);
    }
    
}

const findPokemonByPk=async(id)=>{
    return await Pokemon.findByPk(id,
        {include:[
            {model: Type,attributes:['name'],
            through: {attributes:[]}},
        ],}
    );
}

const getPokemonById = async(id,source) => {
    
    const promise 
        = (source === "api") 
        ? (await axios.get(`${urlid}/${id}`)).data
        : findPokemonByPk(id);

    const pokemon=(source === "api")?cleanObj(promise):promise;        
    
    return pokemon;    
}

const searchPokemonByName = async (namePokemon) => {
    try {
        const urlPokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)).data;
        const apiPokemons = cleanObj(urlPokemon);
        const pokemonBD = await pokemonByNameDB(namePokemon)
        return [...pokemonBD, apiPokemons];
    } catch(error) {
        const pokemonBD = await pokemonByNameDB(namePokemon);
        if(!pokemonBD.length) throw Error("No Found");
        else return pokemonBD;
    }   
}

const createPokemon = async (name,life,attack,defense,height,weight,speed,types,image) => {
    const newPokemon = await Pokemon.create({name,life,attack,defense,height,weight,speed,image});
    console.log(newPokemon);
    await newPokemon.addTypes(types);
    return newPokemon;
}

const deletePokemon = async (idPokemon) => {
    await Pokemon.destroy({
        where:{
            id:idPokemon,
        }
    })    
}

const updatePokemon = async({id,name,life,attack,defense,height,weight,speed,types,image}) => {
    const pokemon = await findPokemonByPk(id);
    console.log(pokemon);
    await pokemon.update({name,life,attack,defense,height,weight,speed,image});
    await pokemon?.setTypes(types);
    await pokemon.save();
}

//https://es.stackoverflow.com/questions/569820/eliminar-relaciones-de-una-tabla-intermedia-en-sequelize

module.exports={getApiData,searchPokemonByName,getPokemonById, createPokemon,deletePokemon,updatePokemon};
