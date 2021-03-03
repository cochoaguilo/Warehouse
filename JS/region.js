const endpointRegiones = '/regiones';
const container = document.getElementById('container');
const jsTree = document.getElementById('jstree');

/*const getRegiones = async () => {
    const usersList = await fetch(endpointRegiones);
    const usersjson = await usersList.json();
    console.log(usersjson);
    fillRegion(usersjson)
  };*/
  apiFetchGET(endpointRegiones).then(data=>{
    console.log(data)
    fillRegion(data)
    })
    
  const fillRegion = (list)=>{
      list.forEach(region =>{
          // variables
          const regiones = region.nombre_region,
                paises = region.nombre_pais,
                ciudades = region.nombre_ciudad;
          
          //Regiones
          let liRegiones = document.createElement('li')
          liRegiones.innerText = regiones;
          container.appendChild(liRegiones);

          //Paises
          let ulPaises = document.createElement('ul'),
              liPaises = document.createElement('li');
          liPaises.innerText = paises;
          liRegiones.appendChild(ulPaises);
          ulPaises.appendChild(liPaises);

          //Ciudades 
          let ulCiudades = document.createElement('ul'),
              liCiudades = document.createElement('li');
          liCiudades.innerText = ciudades;
          liPaises.appendChild(ulCiudades);
          ulCiudades.appendChild(liCiudades);

          //buttons
          let btnPais = document.createElement('button'),
              btnCiudad = document.createElement('button');
          liRegiones.appendChild(btnPais);
          liRegiones.insertBefore(btnPais, ulPaises);
          liPaises.appendChild(btnCiudad);
          liPaises.insertBefore(btnCiudad, ulCiudades);

          btnPais.classList.add('btn-pais');
          btnCiudad.classList.add('btn-ciudad');
          btnPais.innerText = 'Agregar Pais';
          btnCiudad.innerText = 'Agregar Ciudad';

      })
  }



$('#ag-reg').click(function (e) { 
  e.preventDefault();
  let inputTXT  = document.createElement('input'),
      inputBTN  = document.createElement('button');
  jsTree.appendChild(inputTXT)
  jsTree.insertBefore(inputTXT,container)
  jsTree.insertBefore(inputBTN,container)
  inputTXT.id = 'input-region'
  inputTXT.type = 'text';
  inputBTN.id = 'submit-btn'
  inputBTN.type = 'submit'
  inputBTN.innerText = 'agregar'
  $(inputBTN).click(function () { 
    
    console.log(inputTXT.value);
    let body = {
      nombre_region: inputTXT.value
    }
    apiFetchPOST(endpointRegiones, body, 'POST')
    .then(data =>{
      console.log('Nice');
      window.onload();
    })
  });
});

/*$('#submit-btn').click(function (e) { 
  e.preventDefault();
  console.log('hola');
  
  //let inputValue = document.getElementById('input-region')[0].value;
  
  //apiFetchPOST(endpointRegiones, inputValue, 'POST')
});*/