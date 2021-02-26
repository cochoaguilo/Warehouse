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
   
} );


$('#ag-compania').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'block');
});

$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#myModal').css('display', 'none');
});