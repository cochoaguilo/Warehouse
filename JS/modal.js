//get modal

//funcion que llama a la data de la fila
function dataModal (y) {return table.row($(y).data('row')).data()}

const preferencias = document.getElementById('preferencias'),
      interes = document.getElementById('interes'),
      canalContacto = document.getElementById('canal_de_contacto');

//Modal Contactos

$('#ag-contacto').click(function (e) { 
    e.preventDefault();
    $('#info-form').get(0).reset();
    $('#contactos-form').get(0).reset();
    $('#modal-contactos').css("display", "block");
    $('#h3').text('Nuevo contacto');

   agregarDatosContactos()
});

let agregarDatosContactos = async()=>{
  
apiFetchGET(regionesEndpoint)
.then(data =>{
  console.log(data);
  for (let index = 0; index < data.length; index++) {
    const element = data[index].nombre;
    let option = document.createElement('option');
    option.textContent = element;
    option.value = element;
    selectRegion.insertBefore(option,selectRegion.lastChild);
    //console.log(option.value);
    $('#region').change(function(){
      let val = $(this).val()
      //console.log(val);
  
     if (element == val) {
       
      apiFetchGET(
        paisesEndpont + `/region/${data[index].id_region}`
      ).then(dataPaises=> {
        console.log(dataPaises.data)
        for(let indexPais = 0; indexPais < dataPaises.data.length; indexPais++){
        
        const nombrePais = dataPaises.data[indexPais].nombre;
        
        const optionPais = document.createElement('option');
        optionPais.textContent = nombrePais;
        optionPais.value = nombrePais;
        selectPais.appendChild(optionPais);

        $('#pais').change(function (e) { 
          e.preventDefault();
          
          let valPais = $(this).val()

          if (nombrePais == valPais) {
            apiFetchGET(
              ciudadesEndponint + `/pais/${dataPaises.data[indexPais].id_pais}`
            ).then((dataCiudades) => {
              
              let ciudad = dataCiudades.data;
              console.log(ciudad);
              for(let indexCiudades = 0; indexCiudades < ciudad.length; indexCiudades++){
                console.log(ciudad[indexCiudades].id_ciudad);
                const nombreCiudad = ciudad[indexCiudades].nombre;
                
                const optionCiudad = document.createElement('option');
                optionCiudad.textContent = nombreCiudad;
                optionCiudad.value = nombreCiudad;
                selectCiudad.appendChild(optionCiudad);
              }
            })
          }
        });
        }
      }) 
    
    }
  })
  }
  
     
    
  })

  apiFetchGET(configEndpoint+'/preferencias')
.then(pref =>{
  
  for (let indexPref = 0; indexPref < pref.length; indexPref++) {
    const namePref = pref[indexPref].nombre_preferencias;

    let optionPref = document.createElement('option');
    optionPref.textContent = namePref;
    optionPref.value = namePref;
    preferencias.appendChild(optionPref);
    //console.log(option.value);
  }
})

apiFetchGET(configEndpoint+'/interes')
.then(int =>{
 
  for (let indexInt = 0; indexInt < int.length; indexInt++) {
    const valorInt = int[indexInt].valor;

    let optionInt = document.createElement('option');
    optionInt.textContent = valorInt;
    optionInt.value = valorInt;
    interes.appendChild(optionInt);
    //console.log(option.value);
  }
})

apiFetchGET(configEndpoint+'/canal')
.then(canal =>{
 
  for (let indexCanal = 0; indexCanal < canal.length; indexCanal++) {
    const nameCanal = canal[indexCanal].canal;

    let optionCanal = document.createElement('option');
    optionCanal.textContent = nameCanal;
    optionCanal.value = nameCanal;
    canalContacto.appendChild(optionCanal);
    //console.log(option.value);
  }
})
}
//})






$('#container-table').on('click', '.btn-edit', function(e){
  // Reset form
  //console.log(e);
// Reset form
  $('#info-form').get(0).reset();
  $('#contactos-form').get(0).reset();
        // Store current row
  $('#modal-contactos').data('row', $(this).closest('tr'));
  $('#modal-delete-contactos').data('row', $(this).closest('tr'));
  //$('#myModal').css('display', 'block');
  $('#modal-contactos').modal('show');
  $('#h3').text('Editar contacto');

  
  
});


$('#modal-contactos').on('shown.bs.modal', function (e){
  // Get row data
  //let dataModal = table.row($(this).data('row')).data();
 // console.log(dataModal(this));
 // dataModal();
  let texto = arrayContactos.find(contacto =>{
      return contacto.nombre+" "+contacto.apellido+ 
      contacto.correo == $(dataModal(this)[0]).text()

  }) 
  console.log(texto);
  if (h3.textContent == 'Editar contacto') {
      console.log('j');
    }
    //$('#nombre').val(data[index].nombre);
  
  // Set initial data
  $('#nombre').val(texto.nombre).focus();
  $('#apellido').val(texto.apellido).focus();
  $('#email').val(texto.correo).focus();
  $('#cargo').val(dataModal(this)[3]).focus();
  $('#compania').val(dataModal(this)[2]).focus();
 
 // $('#direccion').
  $('#ciudad').val(dataModal[5]).focus();
  
  agregarDatosContactos();
       
});

$('#container-table').on('click', '.btn-delete', function(ev){
 

  $('#modal-delete-contactos').data('row', $(this).closest('tr')); 
    
  $('#modal-delete-contactos').modal('show');
    
   // Set initial data
   //let nombreModal = $('#nombre').val(dataModal[0]).focus();

   
});

$('#modal-delete-contactos').on('shown.bs.modal', function () {

  //let dataModal = table.row($(this).data('row')).data()
  
  
  let find = arrayContactos.find(contacto =>{
      return contacto.nombre+" "+contacto.apellido+contacto.correo == $(dataModal(this)[0]).text(); 
   })
   console.log(find);

   $('h4').text(`Estas seguro de eliminar a ${find.nombre+" "+find.apellido}?`);
  
  $('#delete').click(function (e) { 
      e.preventDefault();
      
      apiFetchDELETE(contactosEndpoint+`/${find.id}`)
      .then(dataDelete =>{
          window.location.reload()
      })
     // dataModal.remove()
      
      
  });
}); 

$('#guardar-contacto').click(function (e) { 
e.preventDefault();


const nombre = document.getElementById("nombre"),
    apellido = document.getElementById("apellido"),
    cargo = document.getElementById("cargo"),
    correo = document.getElementById("email"),
    compania = document.getElementById("compania"),
    ciudad =document.getElementById("ciudad"),
    cuenta = document.getElementById("cuenta_de_usuario"),
    direccion = document.getElementById("direccion");
 
let bodyPostContactos = {
  nombre: nombre.value,
  apellido: apellido.value,
  cargo: cargo.value,
  compania: compania.value,
  correo: correo.value,
  ciudad: ciudad.value,
  interes: interes.value,
  preferencias: preferencias.value,
  canal: canalContacto.value,
  cuenta: cuenta.value,
  direccion: direccion.value
}

if (!nombre.value || !apellido.value || !cargo.value ||
  !correo.value || !compania.value) {
    return alert('Chequear las entradas')
  }

if (h3.textContent != 'Editar contacto'){
 
  apiFetchPOST(contactosEndpoint,bodyPostContactos)
  .then(console.log('nice'), window.location.reload())
//}
//);
}else{
 
let find = arrayContactos.find(contacto =>{
  return contacto.nombre+" "+contacto.apellido+contacto.correo == $(dataModal(this)[0]).text(); 
})
console.log(find.id);
  apiFetchUPDATE(contactosEndpoint+`/${find.id}`, bodyPostContactos)
  .then(update => {
  
      window.location.reload();
 })
}
});  

$('#cancelar-delete').click(function (e) { 
  e.preventDefault();
  $('#modal-delete').modal("hide");
  $('#modal-delete-contactos').modal("hide");
});

//Modal Compañias

$('#ag-compania').click(function (e) { 
    e.preventDefault();
    $('#compania-form').get(0).reset();
    $('#modal-compania').css('display', 'block');
    //$('#myModal').modal('show');
    $('#h3').text('Nueva compañia');
});



$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#modal-compania').css("display", "none");
    $('#modal-compania').modal("hide");
    $('#modal-contactos').css("display", "none");
    $('#modal-contactos').modal("hide");
});

$('#modal-cancelar').click(function (e) { 
    e.preventDefault();
    $('#modal-compania').css("display", "none");
    $('#modal-compania').modal("hide");
    $('#modal-contactos').css("display", "none");
    $('#modal-contactos').modal("hide");
});

/*
//upload
$('#upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "block");
});

$('#cancelar-upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "none");
});
*/



$('#container-companias').on('click', '.btn-edit', function(e){
    // Reset form
    //console.log(e);
  // Reset form
    $('#compania-form').get(0).reset();
          // Store current row
  $('#modal-compania').data('row', $(this).closest('tr'));
  $('#modal-guardar').data('row', $(this).closest('tr'));
    //$('#myModal').css('display', 'block');
    $('#modal-compania').modal('show');
    $('#h3').text('Editar compañia');
    
 });
 $('#modal-compania').on('shown.bs.modal', function (e){
    // Get row data
    //let dataModal = table.row($(this).data('row')).data();

    
    let fila = dataModal(this);
    console.log(fila[0]);
    // Set initial data
    $('#nombre').val(fila[0]).focus();
    $('#correo').val(fila[3]).focus();
    $('#Telefono').val(fila[4]).focus();
    $('#direccion').val(fila[2]).focus();
    $('#ciudad').val(fila[5]).focus();
    
         
});

$('#modal-guardar').click(function (event) { 
  event.preventDefault();

  const nombre = document.getElementById("nombre"),
      ciudad = document.getElementById("ciudad"),
      correo = document.getElementById("correo"),
      telefono = document.getElementById("Telefono"),
      direccion = document.getElementById("direccion")

   let bodyPOSTCompanias = {
       nombre: nombre.value,
       direccion: direccion.value,
       correo: correo.value,
       telefono: telefono.value,
       ciudad: ciudad.value
   }
   
   
   if (h3.textContent !== 'Editar compañia'){
       //console.log(bodyPOSTCompanias);
      apiFetchPOST(companiasEndpoint, bodyPOSTCompanias)
      //.then(dataCompania => {console.log(dataCompania)
       window.location.reload()
   //}
   //);
   }else  {
    let find = arrayCompanias.find(compania =>{
           
          return compania.nombre === dataModal(this)[0]; 
       })
       console.log(find);
       apiFetchUPDATE(companiasEndpoint+`/${find.id}`, bodyPOSTCompanias)
       .then(update => {
       
           console.log(update);
           window.location.reload();
      })
   }
});

$('#container-companias').on('click', '.btn-delete', function(ev){
   

   $('#modal-delete').data('row', $(this).closest('tr')); 
   $('#delete-compania').data('row', $(this).closest('tr')); 
     
   $('#modal-delete').modal('show');
     
    // Set initial data
    //let nombreModal = $('#nombre').val(dataModal[0]).focus();

    
 });

$('#modal-delete').on('shown.bs.modal', function () {

    
    $('h4').text(`Estas seguro de eliminar a ${dataModal(this)[0]}?`);
    
    
}); 

 $('#delete-compania').click(function (e) { 
        e.preventDefault();
        let find = arrayCompanias.find(compania =>{
          return compania.nombre == dataModal(this)[0]; 
       })
        console.log(find.id);
        apiFetchDELETE(companiasEndpoint+`/${find.id}`)
        .then(dataDelete =>{
            window.location.reload()
        })
        //dataModal.remove()
        
        
    });


  
/*
$('#agregar-canal').click(function (e) { 
  e.preventDefault();
  
  crearBloque('Canal de Contacto')
  crearBloque('Cuenta de Usuario');
  crearBloque('Preferencias');

  

});

let crearBloque = (textoBloque)=>{
  let divBloque = document.createElement('div');
  divBloque.className = 'form-block';
  let labelBloque = document.createElement('label');
  labelBloque.innerText = textoBloque;
  let selectBloque = document.createElement('select');
  let optionBloque = document.createElement('option');
  divBloque.append(labelBloque,selectBloque);
  selectBloque.appendChild(optionBloque);
  divBloque.classList.add('bloque-nuevo')
  $('.modal-content').css('height', '600px');

  $('#contactos-form').append(divBloque);
}
*/