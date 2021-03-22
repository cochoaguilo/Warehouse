let contactosEndpoint = '/contactos',
    regionesEndpoint = '/regiones',
    paisesEndpont = '/paises',
    ciudadesEndponint = '/ciudades',
    configEndpoint = '/configuraciones';

  $(document).ready( function () {
    
   
let table = $('#container-table').DataTable({
  dom: 'lBfrtip',
  buttons: [
      'copy','excel','pdf'
  ]
});
    
    

    apiFetchGET(contactosEndpoint).then(data=>{
     console.log(data)
     for (let index = 0; index < data.length; index++) {
      //let inpBox = document.createElement('input');
      //inpBox.setAttribute('type','checkbox');
   //let btnAcciones = document.createElement('button');
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

   let divContainerInteres = document.createElement('div');
   divContainerInteres.className = 'container-interes';
   let divColor = document.createElement('div');
   divContainerInteres.appendChild(divColor)

   if (data[index].valor == 100) {
     divColor.classList.add('color-interes-100')
   }else if(data[index].valor == 75){
    divColor.classList.add('color-interes-75')
   }else if (data[index].valor == 50) {
    divColor.classList.add('color-interes-50')
   }else if (data[index].valor == 25){
    divColor.classList.add('color-interes-25')
   }else{
     return
   }

   let divTxtPais = document.createElement('div');
   let hPais = document.createElement('h5');
   hPais.textContent = data[index].nombre_pais;
   hPais.style.margin = '0'
   let hRegion = document.createElement('h6');
   hRegion.textContent =data[index].nombre_region;
   hRegion.style.margin = '0'
   divTxtPais.append(hPais,hRegion)

   let divTxtContacto =document.createElement('div');
   let hContacto = document.createElement('p');
   hContacto.textContent = data[index].nombre+' '+ data[index].apellido;
   hContacto.style.margin = '0'
   let hMail = document.createElement('p');
   hMail.textContent =data[index].correo;
   hMail.style.margin = '0';
   hMail.style.fontSize = '14px';
   hMail.style.color = 'gray';
   divTxtContacto.append(hContacto,hMail);

   let pCanalPreferido = document.createElement('p');
   pCanalPreferido.textContent = data[index].canal;
   pCanalPreferido.className = 'canal';

         table.row.add([
            divTxtContacto.outerHTML,
            divTxtPais.outerHTML,
            data[index].nombre_compania,
            data[index].cargo,
            pCanalPreferido.outerHTML,
            data[index].valor+'%'+divContainerInteres.outerHTML,
            divButtons.outerHTML
             
             
          ]).draw(false);
     }
     
 })
    .catch(e=>console.log(e));


})
let selectRegion = document.getElementById('region');
let selectPais = document.getElementById('pais');
let selectCiudad = document.getElementById('ciudad')

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
  
//})

const preferencias = document.getElementById('preferencias'),
      interes = document.getElementById('interes'),
      canalContacto = document.getElementById('canal-de-contacto');


apiFetchGET(configEndpoint+'/preferencias')
.then(pref =>{
  console.log(pref);
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
  console.log(int);
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
  console.log(canal);
  for (let indexCanal = 0; indexCanal < canal.length; indexCanal++) {
    const nameCanal = canal[indexCanal].canal;

    let optionCanal = document.createElement('option');
    optionCanal.textContent = nameCanal;
    optionCanal.value = nameCanal;
    canalContacto.appendChild(optionCanal);
    //console.log(option.value);
  }
})

$('.caret').click(function (e) { 
  e.preventDefault();
  $('.nested').toggle();
  
});
    

   
 
  
  
  