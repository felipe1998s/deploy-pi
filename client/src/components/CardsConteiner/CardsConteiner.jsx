import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import NotFoundPokemons from "../NotFoundPokemons/NotFoundPokemons";
// import Paginated from "../Paginated/Paginated";
import style from "./CardsConteiner.module.css";
const CardsConteiner = () =>{
 
    const pokemonsFilter = useSelector((state)=>state.pokemonsFilter); //seleccionar una propiedad del estado global    
    const [propsCard,setPropsCard] = useState([]); // crear un estado local para almacenar las props a visulizar.
    const [currentPage,setCurrentPage]=useState(0); //estado para la pagina actual
    const [totalPages,setTotalPages]=useState(0);// estado para el numero total de paginas
    const totalItemsByPages = 12; //total de elementos por pagina



    useEffect(()=>{
        setPropsCard([...pokemonsFilter].splice(0,totalItemsByPages));//seteo las primeros 12 elementos del estado pF en el estado propsCard.
        setCurrentPage(0);//pagina actual 0 
        setTotalPages(Math.ceil(pokemonsFilter.length/totalItemsByPages));//seteo el estado tP en la cantidad de paginas necesarias (cada pagina debe tener maximo 12 cards)
    },[pokemonsFilter]);// <-- uso lo que hay en el array de dependencias 

    const handleForwad = () =>{
        const totalElements = pokemonsFilter.length; // El total de elementos es la longitud del estado pokemonFilter
        const nextPage = currentPage + 1; // la proxima pagina es igual a la pagina actual + 1
        const firstIndex = nextPage * totalItemsByPages; // el primer indice de cada pagina es proxima pagina * (cantidadCards por pagina)
        if(firstIndex>=totalElements) return; //retorno si mi indice es mayor o igual a la cantidad de elementos.
        setCurrentPage(nextPage);// si el indice es menor seteo en la pagina actual <--- proxima pagina.
        setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages)) // seteo los doce elementos que hayan despues del primer indice en propCards
    }

    const handleBack = () => { //hacia atras
        const prevPage = currentPage - 1; //Pagina previa  es igual a pagina actual - 1
        if(prevPage<0) return; // si pagina previa es menor a 0, retornar.
        const firstIndex = prevPage*totalItemsByPages; // primer indice de cada pagina es igual a pagina previa por 12
        setCurrentPage(prevPage);//seteo la pagina previa en el estado pagina actual.
        setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages));// seteo en propsCard 12 elementos desde el indice inicial.
    
    }

    const Pages = (totalPages) => {
        const arr=[];
        for(let i=1;i<=totalPages;i++){
            arr.push(i);
        }
        return arr;
    }

    const handleNumberPage = (event) => {
        const numero = event.target.value;
        const firstIndex = (numero-1)*totalItemsByPages; //numero*totalItemsByPages - totalItemsByPages
        setCurrentPage(numero-1);
        setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages))
    }

    return(
        <>  
            <div className={style.Paginated}>
                <button onClick={handleBack}>Prev</button>
                {/* <span>{currentPage + 1} of {totalPages}</span> */}
                {Pages(totalPages).map((numero)=>(
                    <button className={`${currentPage === numero-1 ? style.active : style.dtLink}`}
                        key={numero} onClick={handleNumberPage} value={numero}>{numero}</button>
                    ))}
                <button onClick={handleForwad}>Next</button>
            </div>

            <div className={style.Container}>
                {propsCard.length===0?(<NotFoundPokemons/>)   
                    :propsCard.map((pokemon)=>{
                        return <div key={pokemon.id}> <Card
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.types}
                        /> </div>
                    })
                }
            </div>
        </>
    )
}

export default CardsConteiner;