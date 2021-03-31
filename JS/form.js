/*$('#info-form').submit(function (e) { 
    let nombre = document.getElementById('nombre'),
        apellido = document.getElementById('apellido'),
        cargo = document.getElementById('cargo'),
        email = document.getElementById('email'),
        compañia = document.getElementById('compañia');
        
    
    } else {
        e.preventDefault();
        $(this).get(0).reset();
    }
    
    
});*/

let form =document.getElementById('form')

let nombre = document.getElementById('nombre'),
apellido = document.getElementById('apellido'),
perfil = document.getElementById('perfil'),
email = document.getElementById('email'),
contrasena =document.getElementById('contraseña'),
repContrasena =document.getElementById('repcontraseña');
        
form.addEventListener('submit', ()=>{
    if (contrasena.value !== repContrasena.value) {
        return alert('Las contraseñas tienen que ser iguales')
    }

   let bodyUsuarios = {
        nombre: nombre.value,
        apellido: apellido.value,
        perfil: perfil.value,
        correo: email.value,
        contrasena: contrasena.value
    }
    apiFetchPOST('/usuarios',bodyUsuarios)
    .then(data=>console.log(data), window.location.reload())
})