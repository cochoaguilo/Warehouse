


let form = document.getElementById('form-login')


$('#form-login').submit(function (e) { 
  e.preventDefault();
  
  let email = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;
  
  const body ={
    correo:email,
    contrasena: contrasena
  }
  
  //console.log(body);
  apiFetchPOST('/usuarios/login', body).then(data=>{
    console.log(data);
    if(data.token){
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('admin', data.tipo)
    window.location.href = "./Header.html"
    }
    else{
      alert("intente nuevamente")
      
    }
  
  })
})