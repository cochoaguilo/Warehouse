let companiasEndpoint = '/companias';
let container = document.getElementById('container');
var editor;


$(document).ready( function () {

    
   let table = $('#container').DataTable({
   
    
});

new $.fn.dataTable.Buttons( table, {
    buttons: [
        'copy', 'excel', 'pdf'
    ]
} );
   apiFetchGET(companiasEndpoint).then(data=>{
    console.log(data)
    for (let index = 0; index < data.length; index++) {
        let btn = document.createElement('button');
        btn.innerText = '...';

        table.buttons().container()
    
        table.row.add([
            data[index].nombre,
            data[index].nombre_pais,
            data[index].direccion,
            data[index].correo,
            data[index].telefono,
            data[index].nombre_ciudad,
            btn.outerHTML,
            
    
            
         ]).draw(false);
         
        
        
        table.on( 'buttons-action',function (e) { 
            e.preventDefault();
            console.log('hola');
        });
        
    }
    table.on( 'selectItems', function ( e, dt, items ) {
        console.log( 'Items to be selected are now: ', items );
    } );
})
   .catch(e=>console.log(e));
   
  
} );

const nombre = document.getElementById("nombre"),
            ciudad = document.getElementById("ciudad"),
            correo = document.getElementById("correo"),
            telefono = document.getElementById("Telefono"),
            direccion = document.getElementById("direccion")
   $('#compania-form').submit(function (e) { 
       e.preventDefault();
       

        let bodyPOSTCompanias = {
            nombre: nombre.value,
            direccion: direccion.value,
            correo: correo.value,
            telefono: telefono.value,
            ciudad: ciudad.value
        }
        
        apiFetchPOST(companiasEndpoint, bodyPOSTCompanias)
        .then(data => {console.log(data)
    
        }
        );
            
   });
$('#ag-compania').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'block');
});

$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'none');
});

