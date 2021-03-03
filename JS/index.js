

/*$(window).ready(function(){
   
   
      // 8 interact with the tree - either way is OK
      $('#jstree').jstree();
    
      $('#jstree').on("changed.jstree", function (e, data) {
          //console.log(data.selected);
          
        });
       // $('#contactos').on('click', function () {
         //   $('#jstree').jstree(true).select_node('ul');
          
          //});
        $('.caret').on('changed.jstree', function(){
            //$('#jstree').jstree(true).select_node('ul');
            
        })



})*/
let form = document.getElementById('form-login')


$('#form-login').submit(function (e) { 
  e.preventDefault();
  
  let email = document.getElementsByName('correo')[0].value
  let contrasena = document.getElementsByName('contrasena')[0].value
  
  const body ={
    correo:email,
    constrasena: contrasena
  }
  const formData = new FormData();
  formData.append('body',body)
  //console.log(body);
  apiFetchPOST('/usuarios/login', formData).then(data=>{
    console.log(data);
    if(data.token){
    alert(data.msj)
    window.location.href = "./Header.html"
    }
    else{
      alert("intente nuevamente")
    }
  
  })
})