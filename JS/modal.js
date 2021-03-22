//get modal
$('#ag-contacto').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "block");
});


$('#ag-compania').click(function (e) { 
    e.preventDefault();
    $('#compania-form').get(0).reset();
    $('#myModal').css('display', 'block');
    //$('#myModal').modal('show');
    $('#h3').text('Nueva compañia');
});



$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "none");
    $('#myModal').modal("hide");
});

$('#modal-cancelar').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "none");
    $('#myModal').modal("hide");
});

//upload
$('#upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "block");
});

$('#cancelar-upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "none");
});


$('#cancelar-delete').click(function (e) { 
    e.preventDefault();
    $('#modal-delete').modal("hide");
});

$('#container').on('click', '.btn-edit', function(e){
    // Reset form
    //console.log(e);
  // Reset form
    $('#compania-form').get(0).reset();
          // Store current row
  $('#myModal').data('row', $(this).closest('tr'));
    //$('#myModal').css('display', 'block');
    $('#myModal').modal('show');
    $('#h3').text('Editar compañia');
    
 });
 $('#myModal').on('shown.bs.modal', function (e){
    // Get row data
    let dataModal = table.row($(this).data('row')).data();
    
    // Set initial data
    $('#nombre').val(dataModal[0]).focus();
    $('#correo').val(dataModal[3]).focus();
    $('#Telefono').val(dataModal[4]).focus();
    $('#direccion').val(dataModal[2]).focus();
    $('#ciudad').val(dataModal[5]).focus();
    
         
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
     
     console.log(h3.textContent);
     if (h3.textContent != 'Editar compañia'){
         //console.log(bodyPOSTCompanias);
        apiFetchPOST(companiasEndpoint, bodyPOSTCompanias)
        //.then(dataCompania => {console.log(dataCompania)
         window.location.reload()
     //}
     //);
     }else{
         console.log(bodyPOSTCompanias);
         let find = arrayCompanias.find(compania =>{
             
            return compania.nombre = dataModal[0]; 
         })
         console.log(find);
         //apiFetchUPDATE(companiasEndpoint+`/${find.id}`, bodyPOSTCompanias)
         //.then(update => {
           //  delete arrayCompanias[find]
             //console.log(update);
             //window.location.reload();
       // })
     }
});
$('#container').on('click', '.btn-delete', function(ev){
   

   $('#modal-delete').data('row', $(this).closest('tr')); 
     
   $('#modal-delete').modal('show');
     
    // Set initial data
    //let nombreModal = $('#nombre').val(dataModal[0]).focus();

    
 });

$('#modal-delete').on('shown.bs.modal', function () {

    let dataModal = table.row($(this).data('row')).data()
    $('h4').text(`Estas seguro de eliminar a ${dataModal[0]}?`);
    //let Delete = $('#myModal').data('row', $(this).closest('tr'));
    //var dataModalDelete = data('row',$(this).closest('tr'));
    let find = arrayCompanias.find(compania =>{
        return compania.nombre == dataModal[0]; 
     })
     console.log(find.id);
    
    $('#delete').click(function (e) { 
        e.preventDefault();
        apiFetchDELETE(companiasEndpoint+`/${find.id}`)
        .then(dataDelete =>{
            window.location.reload()
        })
        dataModal.remove()
        
        
    });
}); 

$('#guardar-contacto').click(function (e) { 
    e.preventDefault();
    
    let firstForm = $('#info-form').serialize();
    let secondForm = $('#contactos-form').serialize();
    //$('#info-form').submit();
    //$('#contactos-form').submit();
    let bodyPostContactos = {
        firstForm,
        secondForm
    }
    apiFetchPOST(contactosEndpoint,bodyPostContactos)
    .then(console.log('nice'))
  });    


  $('#container-table').on('click', '.btn-edit', function(e){
    // Reset form
    //console.log(e);
  // Reset form
    $('#info-form').get(0).reset();
    $('#contactos-form').get(0).reset();
          // Store current row
  $('#myModal').data('row', $(this).closest('tr'));
    //$('#myModal').css('display', 'block');
    $('#myModal').modal('show');
    $('#h3').text('Editar compañia');
    
 });
 $('#myModal').on('shown.bs.modal', function (e){
    // Get row data
    let dataModal = table.row($(this).data('row')).data();
    
    // Set initial data
    $('#nombre').val(dataModal[0]).focus();
    $('#correo').val(dataModal[3]).focus();
    $('#Telefono').val(dataModal[4]).focus();
    $('#direccion').val(dataModal[2]).focus();
    $('#ciudad').val(dataModal[5]).focus();
    
         
});