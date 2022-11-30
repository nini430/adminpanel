

export const registrationValidation=(name,email,password,confirmPassword)=>{
    const errors={};
    if(name.trim()==="") {
        errors.name="Name field should not be empty"
    }
    if(email.trim()==="") {
        errors.email="Email field should not be empty"
    }else{
        if(!email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)) {
            errors.email="Enter valid Email address"
        }
    }
    if(password.trim()==="") {
        errors.name="Password field should not be empty"
    }
    if(password!==confirmPassword) {
        errors.confirmPassword="Passwords don't match"
    }

    return {errors,isInvalid:Object.keys(errors).length>0}

    
}

export const loginValidation=(email,password)=>{
    const errors={};
    if(email.trim()==="") {
        errors.email="Email should not be empty";

    }

    if(password.trim()==="") {
        errors.password="Password should not be empty"
    }

    return {errors,isInvalid:Object.keys(errors).length>0}
}

