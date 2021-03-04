const endpointRegiones = "/regiones";
const endpointPaises = "/paises";
const endpointCiudades = "/ciudades";
const container = document.getElementById("container");
const jsTree = document.getElementById("jstree");

apiFetchGET(endpointRegiones+'/all').then((data) => {
    console.log(data);
    fillAllTables(data);
});  
apiFetchGET(endpointRegiones).then((data) => {
  console.log(data);

  if (data.nombre) {
    
  }
  fillRegion(data, "regiones");
});
/*apiFetchGET(endpointPaises).then((data) => {
  console.log(data);
  fillRegion(data, "paises");
});
apiFetchGET(endpointCiudades).then((data) => {
  console.log(data);
  fillRegion(data, "ciudades");
});*/

const fillAllTables = (list) => {
  

  list.forEach((region) => {
    
    // variables
    const regiones = region.nombre_region,
          paises = region.nombre_pais,
          ciudades = region.nombre_ciudad;

    //Regiones
    let liRegiones = document.createElement("li");
    container.appendChild(liRegiones);
    liRegiones.textContent = regiones;
    //Paises
    
    let ulPaises = document.createElement("ul"),
          liPaises = document.createElement("li");
    liRegiones.appendChild(ulPaises);
    ulPaises.appendChild(liPaises);
    liPaises.textContent = paises;

    //Ciudades
    let ulCiudades = document.createElement("ul"),
        liCiudades = document.createElement("li");
    liPaises.appendChild(ulCiudades);
    ulCiudades.appendChild(liCiudades);
    liCiudades.textContent = ciudades;

    //buttons
    let btnPais = document.createElement("button"),
      btnCiudad = document.createElement("button");
    liRegiones.appendChild(btnPais);
    liRegiones.insertBefore(btnPais, ulPaises);
    liPaises.appendChild(btnCiudad);
    liPaises.insertBefore(btnCiudad, ulCiudades);

    

    btnPais.classList.add("btn-pais");
    btnCiudad.classList.add("btn-ciudad");
    btnPais.innerText = "Agregar Pais";
    btnCiudad.innerText = "Agregar Ciudad";
  });
};

const fillRegion = (list, nombreDato) => {
  

  list.forEach((dato) => {
   
    // variables
    const dataBring = dato.nombre
    //  paises = region.nombre_pais,
      //ciudades = region.nombre_ciudad;

    //Regiones
    let liRegiones = document.createElement("li");
    
    //Paises
    
    let ulPaises = document.createElement("ul"),
          liPaises = document.createElement("li");

    //Ciudades
    let ulCiudades = document.createElement("ul"),
        liCiudades = document.createElement("li");
    

    //buttons
    let btnPais = document.createElement("button"),
      btnCiudad = document.createElement("button");
    /*liRegiones.appendChild(btnPais);
    liRegiones.insertBefore(btnPais, ulPaises);
    liPaises.appendChild(btnCiudad);
    liPaises.insertBefore(btnCiudad, ulCiudades);*/

    //condicional que asigna los nombres segun la tabla de sql
    if (nombreDato == 'regiones') {
      
      liRegiones.innerText = dataBring;
      container.appendChild(liRegiones);
      liRegiones.appendChild(ulPaises);
    }
    if(nombreDato == 'paises'){
      
          liPaises.innerText = dataBring;
          ulPaises.appendChild(liPaises);
          liPaises.appendChild(ulCiudades);
    }else{
      liCiudades.innerText = dataBring;
      
      ulCiudades.appendChild(liCiudades);
    }

    btnPais.classList.add("btn-pais");
    btnCiudad.classList.add("btn-ciudad");
    btnPais.innerText = "Agregar Pais";
    btnCiudad.innerText = "Agregar Ciudad";
  });
};



$("#ag-reg").click(function (e) {
  e.preventDefault();
  let inputTXT = document.createElement("input"),
    inputBTN = document.createElement("button");
  jsTree.appendChild(inputTXT);
  jsTree.insertBefore(inputTXT, container);
  jsTree.insertBefore(inputBTN, container);
  inputTXT.id = "input-region";
  inputTXT.type = "text";
  inputBTN.id = "submit-btn";
  inputBTN.type = "submit";
  inputBTN.innerText = "agregar";
  $(inputBTN).click(function () {
    let body = {
      nombre: inputTXT.value,
    };
    console.log(body);
    apiFetchPOST(endpointRegiones, body).then((data) => {
      console.log("Nice");
    });
  });
});

/*$('#submit-btn').click(function (e) { 
  e.preventDefault();
  console.log('hola');
  
  //let inputValue = document.getElementById('input-region')[0].value;
  
  //apiFetchPOST(endpointRegiones, inputValue, 'POST')
});*/
