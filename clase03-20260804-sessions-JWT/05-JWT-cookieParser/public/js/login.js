const divMessage=document.getElementById("message")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnLogin=document.getElementById("btnLogin")

const divInfo=document.getElementById("info")
const btnInfo=document.getElementById("btnInfo")

btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!email || !password){
        divMessage.textContent=`Complete email y password`
        setTimeout(() => {
            divMessage.textContent=""
        }, 3000);
        return 
    }

    let response=await fetch("/api/sessions/login", {
        method: "post", 
        headers: {
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        divMessage.textContent="Error al procesar Login"
        return 
    }

    let data=await response.json()
    // localStorage.setItem("token", data.token)
    divMessage.textContent=`Login exitoso para ${data.user.firstName} ${data.user.lastName}`


})

btnInfo.addEventListener("click", async(e)=>{
    e.preventDefault()

    let response=await fetch("/api/pruebas", {
        // headers: {
        //     "authorization": `BEARER ${localStorage.getItem("token")}`
        // }
    })
    if(response.status>=400){
        divInfo.textContent="Error al recuperar datos"
        return 
    }

    let data=await response.json()
    divInfo.textContent=JSON.stringify(data)
})
