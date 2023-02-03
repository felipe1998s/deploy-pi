const validate = (form) => {
    //let {name,life,attack,defense,speed,height,weight} = form;
    let expresion = /^(?![.]+$)[a-zA-Z .]*$/gm;
    let imageEx = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/gm;
    
    let errors = {};    
    if(!form.name){
        errors.name="Name is required"
    }else if(expresion.test(form.name) === false){
        errors.name="The name is invalid"
    }else if(!form.life){
        errors.life="a value is required"
    }else if(form.life<=0 || form.life > 255){
        errors.life="a value between 1 and 255 is required"    
    }else if(!form.attack){
        errors.attack="a value is required"
    }else if(form.attack<=0 || form.attack > 190){
        errors.attack="a value between 1 and 190 is required"
    }else if(!form.defense){
        errors.defense="a value is required"
    }else if(form.defense<=0 || form.defense > 250){
        errors.defense="a value between 1 and 250 is required"
    }else if(!form.speed){
        errors.speed="a value is required"
    }else if(form.speed<=0 || form.speed > 180){
        errors.speed="a value between 1 and 180 is required"
    }else if(!form.height){
        errors.height="a value is required"
    }else if(form.height<=0){
        errors.height="a positive valor is required"
    }else if(!form.weight){
        errors.weight="a value is required"    
    }else if(form.weight<=0){
        errors.weight="a positive valor is required"
    }else if(form.image && imageEx.test(form.image) === false){
        errors.image = "invalid url";
    }
    else if (form.types.length === 0) {
        errors.types = "Types is missing"
    }else if (form.types.length > 3){
        errors.types = "between 1 and 3 types are required"
    }

    console.log(form.types)
    return errors;
    
}

export {validate}