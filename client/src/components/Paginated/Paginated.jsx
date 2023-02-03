

const Paginated=(currentPage)=>{


    // const totalItemsByPages = 12;
    // const pokemonsFilter = useSelector((state)=>state.pokemonsFilter);
    // // const [currentPage,setCurrentPage]=useState(0);
    // const [propsCard,setPropsCard]=useState([]);
    // const totalPages=(Math.ceil(pokemonsFilter.length/totalItemsByPages));

    // useEffect(()=>{
    //     setPropsCard([...pokemonsFilter].splice(0,totalItemsByPages));//seteo las primeros 12 elementos del estado pF en el estado propsCard. 
    // },[pokemonsFilter]);// <-- uso lo que hay en el array de dependencias 



    // const handleBack = () => {
    //     const prevPage = currentPage - 1; //Pagina previa  es igual a pagina actual - 1
    //     if(prevPage<0) return; // si pagina previa es menor a 0, retornar.
    //     const firstIndex = prevPage*totalItemsByPages; // primer indice de cada pagina es igual a pagina previa por 12
    //     //setCurrentPage(prevPage);//seteo la pagina previa en el estado pagina actual.
    //     currentPage=prevPage;
    //     setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages));// seteo en propsCard 12 elementos desde el indice inicial.
    // }

    // const handleForwad = () => {
    //     const totalElements = pokemonsFilter.length; // El total de elementos es la longitud del estado pokemonFilter
    //     const nextPage = currentPage + 1; // la proxima pagina es igual a la pagina actual + 1
    //     const firstIndex = nextPage * totalItemsByPages; // el primer indice de cada pagina es proxima pagina * (cantidadCards por pagina)
    //     if(firstIndex>=totalElements) return; //retorno si mi indice es mayor o igual a la cantidad de elementos.
    //     //setCurrentPage(nextPage);// si el indice es menor seteo en la pagina actual <--- proxima pagina.
    //     currentPage=nextPage;
    //     setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages)) // seteo los doce elementos que hayan despues del primer indice en propCards
    // }

    // const handleNumberPage = (event) =>{
    //     const numero = event.target.value;
    //     const firstIndex = (numero-1)*totalItemsByPages; //numero*totalItemsByPages - totalItemsByPages
    //     //setCurrentPage(numero-1);
    //     currentPage=numero-1;
    //     setPropsCard([...pokemonsFilter].splice(firstIndex,totalItemsByPages))
    // }

    // const Pages = (totalPages) => {
    //     const arr=[];
    //     for(let i=1;i<=totalPages;i++){
    //         arr.push(i);
    //     }
    //     return arr;
    // }

    return(
        <div>
        </div>
    )
}

export default Paginated;