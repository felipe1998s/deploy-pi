import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_SOURCE = "GET_POKEMON_BY_SOURCE";
export const GET_POKEMON_BY_TYPE = "GET_POKEMON_BY_TYPE";
export const GET_POKEMON_TYPES = "GET_POKEMON_TYPES";
export const SORT_AND_FILTER_BY_HP = "SORT_AND_FILTER_BY_HP";
export const SORT_BY_AlPHABET = "SORT_BY_AlPHABET";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const UPDATE_POKEMON = "UPDATE_POKEMON";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_STATE = "CLEAN_STATE";

export const getPokemons = () =>{
    return function(dispatch){
        axios.get("/pokemons")
        .then((res)=>dispatch({type:GET_POKEMONS,payload:res.data}))
    };
};

export const getPokemonById = (id) => {
    return function(dispatch){
        // const serverData = await 
        axios.get(`/pokemons/${id}`)
        .then((res)=>dispatch({type:GET_POKEMON_BY_ID,payload:res.data}));
        // const pokemonDetails = serverData.data;
        //dispatch({type:GET_POKEMON_BY_ID,payload:pokemonDetails});
    }
}

export const getPokemonByName = (name) =>{
        name = name.toLowerCase();
        return function(dispatch){
            axios.get(`/pokemons?name=${name}`)
            .then((response)=>{
                const pokemon = response.data;
                dispatch({type:GET_POKEMON_BY_NAME,payload:pokemon});
            }).catch(((error)=>{
                dispatch({type:GET_POKEMON_BY_NAME,payload:"Not found"});
            }));
        }
        
}

export const getPokemonTypes = () =>{
    return async function(dispatch){
        const serverData = await axios.get("/types");
        const types = serverData.data;
        dispatch({type:GET_POKEMON_TYPES,payload:types});
    }
}

export const getPokemonBySource = (source) =>{
    return {type:GET_POKEMON_BY_SOURCE,payload:source};
};

export const getPokemonByTypes = (type) =>{
    return {type:GET_POKEMON_BY_TYPE,payload:type};
}

export const sortByHP = (option) =>{
    return {type:SORT_AND_FILTER_BY_HP,payload:option};
}

export const sortByAlphabet = (option) => {
    return {type:SORT_BY_AlPHABET,payload:option};
}

export const createPokemon = (data) => {
    return function(dispatch){
        axios.post("/pokemons",data)
        .then((res)=>dispatch({type:CREATE_POKEMON,payload:res.data}))
    }
}

export const deletePokemon = (id,name) => {
    return async function(dispatch){
        await axios.delete(`/pokemons/delete/${id}`)
            .then((res)=> alert(`Destroy ${name} Pokemon`, res))
            .catch((error)=> alert("error;", error))
        dispatch({type:DELETE_POKEMON,payload:id});    
    }
}

export const updatePokemon = (data) => {
    console.log(data, "ACTIONS");
    if(data.update){
        return{type:UPDATE_POKEMON,payload:data};
    }else if(data.cancel){
        return{type:UPDATE_POKEMON,payload:data};
    }else{
        return async function(dispatch){
            await axios.put("/pokemons/update",data)
                .then((res)=>alert(`Updated ${data.name} Pokemon`, res));
            dispatch({type:UPDATE_POKEMON,payload:{update:false}})
        }
    }
}

export const cleanState = () => {
    return{type:CLEAN_STATE}
}