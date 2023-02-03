import React,{ useState } from "react";
// import axios from "axios";
import style from "./Form.module.css";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import { createPokemon, getPokemonTypes } from "../../redux/actions";
import {Link} from "react-router-dom"
import {validate} from "../Form/funciones";

const Form = () =>{

    //https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_con_sus_estad%C3%ADsticas_base

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const [arrayTypes,setArrayTypes]=useState([])
    const [form,setForm] =  useState({
        name:"",
        life:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        types:[]
    });
    const [errors,setErrors]=useState({});

    useEffect(()=>{
        dispatch(getPokemonTypes());
    },[dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setErrors(validate({...form,[property]:value}));
        setForm({...form,[property]:value});
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        if(errors && (!(Object.values(errors).length===0))){
            return alert("¡Los datos no son validos!");
        }else if(Object.values(form).includes(" ") || (form.types.length===0)){
            return alert("¡Debe completar todos los datos!");
        }
        else{
            // axios.post("/pokemons",{...form,types:[...arr]})
            // .then(res=>alert("Creando pokemon",res));
            dispatch(createPokemon({...form,types:[...arr]}));
            alert(`creating ${form.name} pokemon`);
            setForm({
                name:"",
                life:"",
                attack:"",
                defense:"",
                speed:"",
                height:"",
                weight:"",
                image:"",
                types:[]
            })
        }
    }

    function filterTypes(e) {
        const name = e.target.name;
        setForm({...form,types:form.types.filter(type => type.name !== name)
        });
        setErrors(validate({...form,types:form.types.filter(type => type.name !== name)
        }));
        setArrayTypes(arrayTypes.filter((type)=>type !== name));
    }

    
    let arr = [];
    let arrNames = []
    const idType = (types,arrayTypes) =>{    
        for(let i=0;i < arrayTypes.length;i++){
            for(let j=0;j<types.length;j++){
                if(arrayTypes[i]===types[j].name){
                    arr.push(types[j].id);
                    arrNames.push(types[j].name);
                }
            }
        }
    };
    idType(types,arrayTypes);


    const handleSelect = (event) =>{
            const name = event.target.value;
            
            setArrayTypes([...arrayTypes,name]);

            setForm({...form,types: [...form.types,{name}] });

            setErrors(validate({...form,types: [...form.types, {name}] }));
    }

    return(
        <div className={style.Conteiner}>
            <div className={style.boxForm}>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>name: </label>
                        <input type="text" placeholder="name" value={form.name} onChange={changeHandler} name="name" />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <br />
                    <div>
                        <label>life: </label>
                        <input type="number" placeholder="life"  value={form.life} onChange={changeHandler} name="life" />
                        {errors.life && <p>{errors.life}</p>}
                    </div>
                    <br />
                    <div>
                        <label>attack: </label>
                        <input type="number" placeholder="attack" value={form.attack} onChange={changeHandler} name="attack" />
                        {errors.attack && <p>{errors.attack}</p>}
                    </div>
                    <br />
                    <div>
                        <label>defense: </label>
                        <input type="number" placeholder="defense" value={form.defense} onChange={changeHandler} name="defense"/>
                        {errors.defense && <p>{errors.defense}</p>}
                    </div>
                    <br />
                    <div>
                        <label>speed: </label>
                        <input type="number" placeholder="speed" value={form.speed} onChange={changeHandler} name="speed"/>
                        {errors.speed && <p>{errors.speed}</p>}
                    </div>
                    <br />
                    <div>
                        <label>height: </label>
                        <input type="number" placeholder="height" value={form.height} onChange={changeHandler} name="height"/>
                        {errors.height && <p>{errors.height}</p>}
                    </div>
                    <br />
                    <div>
                        <label>weight: </label>
                        <input type="number" placeholder="weight" value={form.weight} onChange={changeHandler} name="weight"/>
                        {errors.weight && <p>{errors.weight}</p>}
                    </div>
                    <br />
                    <div>
                        <label>Image: </label>
                        <input type="text" placeholder="Image" value={form.image} onChange={changeHandler} name="image"/>
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <br />
                    <div className={style.Divselect}>
                        <label htmlFor="">Select Types</label>
                        <select onChange={(e)=>handleSelect(e)}>
                            <option>select a type</option>
                            { //e.id ---> e.name

                                types.map( e => {
                                    if(!arr.includes(e.id)){
                                        return (
                                            <option key={e.name} value={`${e.name}` }>{e.name}</option>
                                        )
                                    }
                                    return "hola";
                                })
                            }
                        </select>
                        {errors.types && (<p>{errors.types}</p>)}
                    </div>
                    <br />
                    <div className={style.DivButton}>
                        <button className={style.btnPrimary} type="submit">SUBMIT</button>
                        <div className={style.title}>
                            <h1>CREATE YOUR POKEMON!</h1>
                        </div>
                    </div>
                    <br />
                    
                    
                </form>
            </div>
            <br />
            <div>
                <div className={style.boxImg}>
                    <h3>IMAGE</h3>
                    <div>
                        <img height={200} width={200} src={form.image} alt={form.name}/>
                    </div>
                </div>
                <div className={style.boxTypesFather}>
                    <h3>TYPES</h3>
                    <div className={style.boxTypes}>
                    {
                            form.types?.map( (e) => {
                                    return (
                                        <div key={e.name}>
                                            <div  className={style.types}>
                                                <li>{e.name}</li>
                                                <button name={`${e.name}`} onClick={(event)=>{filterTypes(event)}}>X</button>
                                            </div>
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
            
            <div>
                <Link to="/home"><button className={style.btnPrimary}>HOME</button></Link>
            </div>
        </div>
    )
}

export default Form;