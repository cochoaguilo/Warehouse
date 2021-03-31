const endpointRegiones = "/regiones";
const endpointPaises = "/paises";
const endpointCiudades = "/ciudades";
const container = document.getElementById("container");
const jsTree = document.getElementById("jstree");

$(document).ready(function () {
  //llamo a la tabla de regiones
  apiFetchGET(endpointRegiones).then((dataRegiones) => {
    for (let index = 0; index < dataRegiones.length; index++) {
      const element = dataRegiones[index].nombre;
      const indiceRegiones = dataRegiones[index].id_region;
      //Imprimo los nombres
      //caret
      let caretRegiones = document.createElement("span");
      caretRegiones.className = "caret";
      caretRegiones.innerText = element;

      //li
      let liRegiones = document.createElement("li");
      liRegiones.id = element;
      container.appendChild(liRegiones);

      liRegiones.style.padding = "10px";
      liRegiones.style.margin = "10px";

      //ul
      let ulPaises = document.createElement("ul");
      liRegiones.append(caretRegiones, ulPaises);
      ulPaises.className = "nested";
      //buttons
      let btnPais = document.createElement("button");
      liRegiones.insertBefore(btnPais, ulPaises);

      btnPais.classList.add("btn-pais");
      btnPais.innerText = "Agregar Pais";

      caretClick(caretRegiones, ulPaises)

      //el boton de agregar pais llama al evento de los inputs
      btnPais.addEventListener("click", () => {
        inputButtons(liRegiones, ulPaises, endpointPaises, indiceRegiones);
      });

      editDeleteBtns(liRegiones, btnPais, indiceRegiones, endpointRegiones);

      //proximo fetch paises

      apiFetchGET(
        endpointPaises + `/region/${dataRegiones[index].id_region}`
      ).then((dataPaises) => {
        let paises = dataPaises.data;
        console.log(paises);
        for (let indexPais = 0; indexPais < paises.length; indexPais++) {
          const nombre = paises[indexPais].nombre;
          const indicePaises = paises[indexPais].id_pais;

          //caret
          let caretPaises = document.createElement("span");
          caretPaises.className = "caret";
          caretPaises.innerText = nombre;

          //li
          let liPaises = document.createElement("li");
          liPaises.id = nombre;
          liPaises.style.padding = "10px";
          liPaises.style.margin = "10px";
          ulPaises.appendChild(liPaises);
          //liPaises.innerText = nombre;

          //ul
          let ulCiudades = document.createElement("ul");
          ulCiudades.className = 'nested'
          liPaises.append(caretPaises ,ulCiudades);

          //buttons
          let btnCiudad = document.createElement("button");
          liPaises.insertBefore(btnCiudad, ulCiudades);
          btnCiudad.classList.add("btn-ciudad");
          btnCiudad.innerText = "Agregar Ciudad";
          editDeleteBtns(liPaises, btnCiudad, indicePaises, endpointPaises);

          caretClick(caretPaises, ulCiudades);

          //el boton de agregar ciudad llama al evento de los inputs
          btnCiudad.addEventListener("click", () => {
            inputButtons(
              liPaises,
              ulCiudades,
              endpointCiudades,
              undefined,
              paises[indexPais].id_pais
            );
          });

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

              editDeleteBtns(liCiudades, undefined, ciudades[indexCiudades].id_ciudad,endpointCiudades )
            }
          });
        }
      });
    }
  });

  $("#ag-reg").click(function (e) {
    e.preventDefault();
    inputButtons(jsTree, container, endpointRegiones);
  });

  //  funcion que tratan los inputs

  function inputButtons(container, container2, endpoint, idRegion, idPais) {
    let inputTXT = document.createElement("input"),
      inputBTN = document.createElement("button"),
      closeBtn = document.createElement("button");
    container.insertBefore(inputTXT, container2);
    container.insertBefore(inputBTN, container2);
    container.insertBefore(closeBtn, container2);
    inputTXT.type = "text";
    inputTXT.className = 'input-txt';
    
    if (container == jsTree) {
      //estilo distinto para el input de la region
      inputTXT.placeholder = 'Agrega una Región';
      inputTXT.style.height = '50px';
      inputTXT.style.fontSize ='22px';
      inputBTN.style.height = '50px';
      inputBTN.style.fontSize ='22px';
      closeBtn.style.height = '50px';
      closeBtn.style.fontSize ='22px';
    }else if (endpoint == endpointPaises) {
      inputTXT.placeholder = 'Agrega un País';
      
    }
    else{
      inputTXT.placeholder = 'Agrega una Ciudad';
    }

    //agregar la region/ciudad/pais o cerrar el input
    inputBTN.className = "submit-btn";
    inputBTN.type = "submit";
    inputBTN.innerText = "AGREGAR";
    closeBtn.innerText = "X";
    closeBtn.className = 'close-submit';
    $(inputBTN).click(function () {
      let body = {
        nombre: inputTXT.value,
        id_region: idRegion,
        id_pais: idPais,
      };
      console.log(body);
      apiFetchPOST(endpoint, body).then((data) => {
        window.location.reload();
        
      });
    });

    $(closeBtn).click(function (e) {
      e.preventDefault();

      inputBTN.remove();
      inputTXT.remove();
      this.remove();
    });
  }

  //funcion que imprime los botones edit y delete
  function editDeleteBtns(container, btn, indice, endpoint) {
    let btnEdit = document.createElement("button");
    
    btnEdit.innerText = "Edit";
    btnEdit.className = "btn-edit";

    let btnDelete = document.createElement("button");
    
    if (container == 'liCiudades') {
      container.append(btnEdit,btnDelete)
    }else{
      container.insertBefore(btnEdit, btn);
      container.insertBefore(btnDelete, btn);
    }
    btnDelete.innerText = "Delete";
    btnDelete.className = "btn-delete";

    //evento que llama al delete
    btnDelete.addEventListener("click", () => {
      apiFetchDELETE(endpoint + `/${indice}`).then(window.location.reload());
    });

    //evento que modifica el nombre de las regiones/paises
    btnEdit.addEventListener("click", () => {
      let nombre = prompt("Cambia el nombre:");
      console.log(nombre);
      if (nombre == null) {
        return;
      }
      let body = {
        nombre: nombre,
      };
      apiFetchUPDATE(endpoint + `/${indice}`, body).then(
        window.location.reload()
      );
    });
  }
});

//Funcion que desplega las listas y modifica el caret
let caretClick = function(caret, ul){
  caret.addEventListener("click", () => {
  //console.log(this.parentElement);
  ul.classList.toggle("active");
  caret.classList.toggle("caret-down");
})
}