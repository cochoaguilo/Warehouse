let companiasEndpoint = '/companias';
let container = document.getElementById('container');
let btn = document.createElement('button');


$(document).ready( function () {
    
   let table = $('#container').DataTable();
   apiFetchGET(companiasEndpoint).then(data=>{
    console.log(data)
    for (let index = 0; index < data.length; index++) {
        table.row.add([
            data[index].nombre,
            data[index].nombre_pais,
            data[index].direccion,
            data[index].correo,
            data[index].telefono,
            data[index].nombre_ciudad,
            btn
            
         ]).draw(false);
    }
    
})
   .catch(e=>console.log(e));

   $('#compania-form').submit(function (e) { 
       e.preventDefault();
       let nombre = document.getElementsByName("nombre")[0].value,
            ciudad = document.getElementsByName("ciudad")[0].value,
            correo = document.getElementsByName("correo")[0].value,
            telefono = document.getElementsByName("Telefono")[0].value,
            direccion = document.getElementsByName("direccion")[0].value

        let bodyPOSTCompanias = {
            nombre:nombre,
            ciudad:ciudad,
            corre: correo,
            telefono: telefono,
            direccion:direccion
        }

        let formData =new FormData();
        formData.append('data', bodyPOSTCompanias);
            console.log(formData);
            apiFetchPOST(companiasEndpoint, formData);
            
   });
   
  
} );


$('#ag-compania').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'block');
});

$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'none');
});