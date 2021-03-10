let contactosEndpoint = '/contactos',
    regionesEndpoint = '/regiones',
    paisesEndpont = '/paises';

  $(window).ready( function () {
    
   

      // 8 interact with the tree - either way is OK
      $('#jstree').jstree();
    
      $('#jstree').on("changed.jstree", function (e, data) {
          //console.log(data.selected);
          
        });
        /*$('#contactos').on('click', function () {
          $('#jstree').jstree(true).select_node('ul');
          
          });*/
        $('.caret').on('changed.jstree', function(){
            $('#jstree').jstree(true).select_node('ul');
            
        })
let table = $('#container-table').DataTable();
    
    

    apiFetchGET(contactosEndpoint).then(data=>{
     console.log(data)
     for (let index = 0; index < data.length; index++) {
      let inpBox = document.createElement('input');
      inpBox.setAttribute('type','checkbox');
      let btnAcciones = document.createElement('button');
      btnAcciones.innerText = '...';
         table.row.add([
            inpBox.outerHTML,
            data[index].nombre +' '+ data[index].apellido,
            data[index].nombre_pais + "   "+data[index].nombre_region,
            data[index].nombre_compania,
            data[index].cargo,
            data[index].canal,
            data[index].valor,
            btnAcciones.outerHTML
             
             
          ]).draw(false);
     }
     
 })
    .catch(e=>console.log(e));


})
let selectRegion = document.getElementById('region');

apiFetchGET(regionesEndpoint)
.then(data =>{
  for (let index = 0; index < data.length; index++) {
    const element = data[index].nombre;

    let option = document.createElement('option');
    option.textContent = element;
    selectRegion.insertBefore(option,selectRegion.lastChild);
  }
})

    
$('#modal-guardar').click(function (e) { 
  e.preventDefault();
  console.log('hola');
  let firstForm = $('#info-form').serialize();
  let secondForm = $('#contactos-form').serialize();
  $('#info-form').submit();
  $('#contactos-form').submit();
  apiFetchPOST(contactosEndpoint,firstForm+secondForm)
  .then(console.log('nice'))
});    
   
 
  
  
  