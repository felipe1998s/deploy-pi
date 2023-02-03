const {Router} = require("express");
const {getPokemonsHandler,getPokemonByIdHandler, postPokemonsHandler, deletePokemonHandler, updatePokemonHandler} = require("../handlers/handlersPokemons");


const pokemonsRouter = Router();

pokemonsRouter.get("/",getPokemonsHandler);

pokemonsRouter.get("/:id",getPokemonByIdHandler);

pokemonsRouter.post("/", postPokemonsHandler);

pokemonsRouter.delete("/delete/:id",deletePokemonHandler);

pokemonsRouter.put("/update/", updatePokemonHandler)

module.exports=pokemonsRouter;