const axios = require('axios');
const Pokemon = require('../models/Pokemon');
const Type = require('../models/Type');
const {getApiData,searchPokemonByName,getPokemonById, createPokemon, deletePokemon, updatePokemon} = require("../controllers/pokemonsControllers");
const { request } = require('express');

const getPokemonsHandler = async (req,res) =>{
    try {    
        const {name} = req.query;
        const result = name ? await searchPokemonByName(name) : await getApiData();
        res.status(200).json(result);    
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
};

const getPokemonByIdHandler = async (req,res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const pokemon = await getPokemonById(id,source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};

const postPokemonsHandler = async (req,res) => {
    const {name,life,attack,defense,height,weight,speed,types,image} = req.body;
    try {
        await createPokemon(name,life,attack,defense,height,weight,speed,types,image);
        res.status(201).json({msj: "your pokemon was successfully created"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deletePokemonHandler = async (req,res) => {
    let {id} = req.params;
    try {
        await deletePokemon(id);
        res.status(200).json({msj:"pokemon was successfully destroyed"})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const updatePokemonHandler = async(req,res) => {
    let {id,name,life,attack,defense,height,weight,speed,types,image} = req.body;
    try {
        await updatePokemon({id,name,life,attack,defense,height,weight,speed,types,image});
        res.status(200).json({msj:"pokemon was successfully updated"})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={getPokemonsHandler, getPokemonByIdHandler, postPokemonsHandler,deletePokemonHandler,updatePokemonHandler}
