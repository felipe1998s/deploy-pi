import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import { getPokemonTypes, updatePokemon } from "../../redux/actions";
import { validate } from "../../views/Form/funciones";
import style from "../UpdateForm/UpdateForm.module.css";

const UpdateForm = ({data}) => {   
    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const [errors,setErrors]=useState({});
    const [form,setForm]=useState({
        id: data.id,
        name: data.name,
        life: data.life,
        attack: data.attack,
        defense:data.defense,
        speed: data.speed,
        weight:data.weight,
        height:data.height,
        image:data.image,
        types:data.types
    });
    const [arrayTypes,setArrayTypes]=useState(data.types.map((type)=>type.name))

    useEffect(()=>{
        dispatch(getPokemonTypes());
    },[dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setErrors(validate({...form,[property]:value}));
        setForm({...form,[property]:value});
    }

    


    const filterTypes = (event) => {
        const name = event.target.name;
        setForm({...form, types: form.types.filter(type => type.name !== name)
        });
        setErrors(validate({...form, types: form.types.filter(type => type.name !== name)
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
        setForm({...form, types:[...form.types,{name}]});
        setErrors(validate({...form,types: [...form.types, {name}] }));
        setArrayTypes([...arrayTypes,name]);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updatePokemon({...form,types:arr,update:false}));
            setForm({
                update:"",
                id:"",
                name:"",
                life:"",
                attack:"",
                defense:"",
                speed:"",
                weight:"",
                height:"",
                image:"",
                types:[]
            });
            window.location.reload();
    }

    const handleCancel = () => {
        dispatch(updatePokemon({update:false,cancel:true}));        
    }

    return(
        <dir>
        <div className={style.Conteiner}>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>name: </label>
                        <input type="text" placeholder="name" value={form.name} name="name" onChange={changeHandler} />
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
                    <br />
                    <div className={style.Divselect}>
                        <label>Select Types</label>
                        <select onChange={(event)=>handleSelect(event)}>
                            <option>Select a type</option>
                            {
                                
                                types.map((type)=>{
                                    const save = form.types.map((tp)=>tp.name);
                                    if(!arr.includes(type.id) && !save.includes(type.name)){
                                        return (<option key={type.name} value={`${type.name}`}>{type.name}</option>)
                                    }
                                    return "fin";
                                })
                            }
                        </select>
                        {errors.types && <p>{errors.types}</p>}
                    </div>
                    <div>
                        <button className={style.btnPrimary} type="submit">SUBMIT</button>
                        <div>
                            <h1>UPDATE YOUR POKEMON!</h1>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div>
            <div className={style.boxImg}>
                <h3>IMAGE</h3>
                <div>
                    <img height={200} width={200} src={form.image} alt={form.name} />
                </div>
            </div>
            <div className={style.boxTypesFather}>
                <h3>TYPES</h3>
                <div className={style.boxTypes}></div>
                {
                    form.types?.map((type)=>{
                        return(
                            
                                <div key={type.name} className={style.types}>
                                    <li>{type.name}</li>
                                    <button name={type.name} onClick={(event)=>filterTypes(event)}>X</button>
                                </div>
                             
                        )
                    })
                }
            </div>
            </div>
            <div>
            <button className={style.cancel} onClick={handleCancel}>X</button>
            </div>
        </div>
        </dir>
    )
}

export default UpdateForm;