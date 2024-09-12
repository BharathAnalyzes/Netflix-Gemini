

export const checkValidData =(email,password,name)=>{
    const isValidEmail= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isValidPassword= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    //const isValidName = name ? /^[a-zA-Z\s]{2,50}$/.test(name) : true;
    const isValidName = name ? /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name) : true;

    if(!isValidName) return "Name is not valid";
    
    if(!isValidEmail) return "Email is not valid";

    if(!isValidPassword) return "Password is not valid";

    return null;
}