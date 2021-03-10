const endpointRegiones = "/regiones";
const endpointPaises = "/paises";
const endpointCiudades = "/ciudades";
const container = document.getElementById("container");
const jsTree = document.getElementById("jstree");


apiFetchGET(endpointRegiones).then((dataRegiones) => {
  

  for (let index = 0; index < dataRegiones.length; index++) {
    const element = dataRegiones[index].nombre;
    
    //li
    let liRegiones = document.createElement("li");
    liRegiones.id = element;
    container.appendChild(liRegiones);
    liRegiones.innerText = element;
    
    //ul
    let ulPaises = document.createElement("ul");
    liRegiones.appendChild(ulPaises);

    //buttons
    let btnPais = document.createElement("button");
    liRegiones.appendChild(btnPais);
    liRegiones.insertBefore(btnPais, ulPaises);

    btnPais.classList.add("btn-pais");

    btnPais.innerText = "Agregar Pais";

    apiFetchGET(
      endpointPaises + `/region/${dataRegiones[index].id_region}`
    ).then((dataPaises) => {
      let paises = dataPaises.data;
      for (let indexPais = 0; indexPais < paises.length; indexPais++) {
        
        //li
        let liPaises = document.createElement("li");
        liPaises.id = paises[indexPais].nombre;
        ulPaises.appendChild(liPaises);
        liPaises.innerText = paises[indexPais].nombre;
        
        //ul
        let ulCiudades = document.createElement("ul");
        liPaises.appendChild(ulCiudades);

        //buttons
        let btnCiudad = document.createElement("button");
        liPaises.appendChild(btnCiudad);
        liPaises.insertBefore(btnCiudad, ulCiudades);
        btnCiudad.classList.add("btn-ciudad");
        btnCiudad.innerText = "Agregar Ciudad";

        apiFetchGET(
          endpointCiudades + `/pais/${paises[indexPais].id_pais}`
        ).then((dataCiudades) => {
          let ciudades = dataCiudades.data;

          for (
            let indexCiudades = 0;
            indexCiudades < ciudades.length;
            indexCiudades++
          ) {
            let liCiudades = document.createElement("li");
            liCiudades.id = ciudades[indexCiudades].nombre;
            ulCiudades.appendChild(liCiudades);
            liCiudades.innerText = ciudades[indexCiudades].nombre;

            
          }
        });
      }
    });
  }
});





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
