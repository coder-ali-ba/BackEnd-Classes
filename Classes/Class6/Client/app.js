fetch("http://localhost:5000/allUsers")
.then(res=> res.json())
.then((users)=>{
console.log(users);

})
.catch((error)=>{
    console.log("error", error);    
})





const createUser = ()=>{
    const fullname= document.getElementById("fullname")
    const email= document.getElementById("email")
    const password= document.getElementById("password")

    const userObj = {
        fullName : fullname.value,
        Email : email.value,
        Password : password.value
    }

    fetch("http://localhost:5000/createuser" , {
       method : "POST",
       headers : {
        'Content-Type' : 'application/json'
       }, 
       body : JSON.stringify(userObj)
    })
  .then(res=> res.json())
   .then((users)=>{
   console.log(users);

   })
.catch((error)=>{
    console.log("error", error);    
})

}