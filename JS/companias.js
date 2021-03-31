let companiasEndpoint = '/companias';
let container = document.getElementById('container-companias');
let arrayCompanias = [];
let h3 = document.getElementById('h3')



    
   let table = $('#container-companias').DataTable({

});


   apiFetchGET(companiasEndpoint).then(data=>{
    console.log(data)
    for (let index = 0; index < data.length; index++) {
        let divButtons = document.createElement('div')
        let btn = document.createElement('button');
        btn.className = 'btn-edit';
        let i = document.createElement('i');
        i.className = 'fa fa-edit';
        btn.appendChild(i);

        let btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        let iDelete = document.createElement('i');
        iDelete.className = 'fa fa-trash';
        btnDelete.appendChild(iDelete);

        divButtons.appendChild(btn)
        divButtons.appendChild(btnDelete)

        arrayCompanias.push({
            nombre:data[index].nombre,
            id:data[index].id_compania
        })
    
        table.row.add([
            data[index].nombre,
            data[index].nombre_pais,
            data[index].direccion,
            data[index].correo,
            data[index].telefono,
            data[index].nombre_ciudad,
            divButtons.outerHTML,
            
    
            
         ]).draw(false);
         
        
    }
    
})
   .catch(e=>console.log(e));
   
  


