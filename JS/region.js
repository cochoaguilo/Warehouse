const endpointRegiones = "/regiones";
const endpointPaises = "/paises";
const endpointCiudades = "/ciudades";
const container = document.getElementById("container");
const jsTree = document.getElementById("jstree");

$(document).ready(function () {
  




apiFetchGET(endpointRegiones).then((dataRegiones) => {
  
  
  for (let index = 0; index < dataRegiones.length; index++) {
    const element = dataRegiones[index].nombre;
    const indiceRegiones = dataRegiones[index].id_region
    //li
    let liRegiones = document.createElement("li");
    liRegiones.id = element;
    container.appendChild(liRegiones);
    liRegiones.innerText = element;
    liRegiones.style.padding = "10px";
    liRegiones.style.margin = "10px";
    
    //ul
    let ulPaises = document.createElement("ul");
    liRegiones.appendChild(ulPaises);

    //buttons
    let btnPais = document.createElement("button");
    liRegiones.insertBefore(btnPais, ulPaises);
    
    btnPais.classList.add("btn-pais");
    btnPais.innerText = "Agregar Pais";
    
    btnPais.addEventListener('click', ()=>{
      inputButtons(liRegiones,ulPaises, endpointPaises, indiceRegiones)
    })

    editDeleteBtns(liRegiones,btnPais,indiceRegiones, endpointRegiones)

    //proximo fetch paises

    apiFetchGET(
      endpointPaises + `/region/${dataRegiones[index].id_region}`
    ).then((dataPaises) => {
      let paises = dataPaises.data;
      console.log(paises);
      for (let indexPais = 0; indexPais < paises.length; indexPais++) {

        const nombre = paises[indexPais].nombre;
        const indicePaises = paises[indexPais].id_pais;
        
        //li
        let liPaises = document.createElement("li");
        liPaises.id = nombre
        liPaises.style.padding = "10px";
        liPaises.style.margin = "10px";
        ulPaises.appendChild(liPaises);
        liPaises.innerText = nombre;
        
        //ul
        let ulCiudades = document.createElement("ul");
        liPaises.appendChild(ulCiudades);

        //buttons
        let btnCiudad = document.createElement("button");
        liPaises.insertBefore(btnCiudad, ulCiudades);
        btnCiudad.classList.add("btn-ciudad");
        btnCiudad.innerText = "Agregar Ciudad";
        editDeleteBtns(liPaises,btnCiudad,indicePaises, endpointPaises)
      

        btnCiudad.addEventListener('click',()=>{
          inputButtons(liPaises,ulCiudades, endpointCiudades,undefined, paises[indexPais].id_pais )
        })


        //proximo fetch ciudades

        apiFetchGET(
          endpointCiudades + `/pais/${paises[indexPais].id_pais}`
        ).then((dataCiudades) => {
          let ciudades = dataCiudades.data;
          console.log(ciudades);
          for (
            let indexCiudades = 0;
            indexCiudades < ciudades.length;
            indexCiudades++
          ) {
            let liCiudades = document.createElement("li");
            liCiudades.id = ciudades[indexCiudades].nombre;
            liCiudades.style.padding = "10px";
            liCiudades.style.margin = "10px";
            ulCiudades.appendChild(liCiudades);
            liCiudades.innerText = ciudades[indexCiudades].nombre;

            let btnEdit = document.createElement("button");
            liCiudades.appendChild(btnEdit);
            btnEdit.innerText = "Edit";
            btnEdit.className = "btn-edit";
            
            let btnDelete = document.createElement("button");
            liCiudades.appendChild(btnDelete);
            btnDelete.innerText = "Delete";
            btnDelete.className = "btn-delete";

            btnDelete.addEventListener('click', ()=>{
              apiFetchDELETE(endpointCiudades+`/${ciudades[indexCiudades].id_ciudad}`)
              .then(
                
                window.location.reload()
              )
            })
          }
        });
      }
    });

  }
});





$("#ag-reg").click(function (e) {
  e.preventDefault();
  inputButtons(jsTree, container, endpointRegiones)
  
  
});

// 2 funciones que tratan los botones de delete y edit ademas de los inputs

function inputButtons(container, container2, endpoint, idRegion,idPais) {
  let inputTXT = document.createElement("input"),
    inputBTN = document.createElement("button"),
    closeBtn = document.createElement("button");
  container.insertBefore(inputTXT, container2);
  container.insertBefore(inputBTN, container2);
  container.insertBefore(closeBtn, container2);
  inputTXT.type = "text";
  inputBTN.className = "submit-btn";
  inputBTN.type = "submit";
  inputBTN.innerText = "agregar";
  closeBtn.innerText = "X";
  $(inputBTN).click(function () {
    let body = {
      nombre: inputTXT.value,
      id_region: idRegion,
      id_pais: idPais,

    };
    console.log(body);
    apiFetchPOST(endpoint, body).then((data) => {
      window.location.reload();
      console.log("Nice");
    });
  });

  $(closeBtn).click(function (e) { 
    e.preventDefault();

    inputBTN.remove();
    inputTXT.remove();
    this.remove()
  });
}

function editDeleteBtns(container, btn, indice, endpoint) {
  let btnEdit = document.createElement("button");
  container.insertBefore(btnEdit, btn)
  btnEdit.innerText = "Edit";
  btnEdit.className = "btn-edit";

  let btnDelete = document.createElement("button");
  container.insertBefore(btnDelete,btn )
  btnDelete.innerText = "Delete"
  btnDelete.className = "btn-delete";

  btnDelete.addEventListener('click',()=>{
    apiFetchDELETE(endpoint+`/${indice}`)
    .then(
      window.location.reload()
    )
  })

  btnEdit.addEventListener('click', ()=>{
   let nombre =  prompt('Cambia el nombre:')
   console.log(nombre);
   let body = {
     nombre:nombre
   }
   apiFetchUPDATE(endpoint+`/${indice}`, body)
   .then(
     window.location.reload()
   )
  })

}

});


