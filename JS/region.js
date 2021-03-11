const endpointRegiones = "/regiones";
const endpointPaises = "/paises";
const endpointCiudades = "/ciudades";
const container = document.getElementById("container");
const jsTree = document.getElementById("jstree");

$(document).ready(function () {
  




apiFetchGET(endpointRegiones).then((dataRegiones) => {
  
  
  for (let index = 0; index < dataRegiones.length; index++) {
    const element = dataRegiones[index].nombre;
    
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
    let btnPais = document.createElement("button"),
        btnEdit = document.createElement("button"),
        btnDelete = document.createElement("button");

    
    liRegiones.insertBefore(btnPais, ulPaises);
    liRegiones.insertBefore(btnEdit, btnPais);
    liRegiones.insertBefore(btnDelete, btnPais);

    btnPais.classList.add("btn-pais");
    btnEdit.className = "btn-edit";
    btnDelete.className = "btn-delete";

    btnPais.innerText = "Agregar Pais";
    btnEdit.innerText = "Edit";
    btnDelete.innerText = "Delete";
    btnPais.addEventListener('click', ()=>{
      inputButtons(liRegiones,ulPaises, endpointPaises, dataRegiones[index].id_region)
    })

    apiFetchGET(
      endpointPaises + `/region/${dataRegiones[index].id_region}`
    ).then((dataPaises) => {
      let paises = dataPaises.data;
      console.log(paises);
      for (let indexPais = 0; indexPais < paises.length; indexPais++) {
        
        //li
        let liPaises = document.createElement("li");
        liPaises.id = paises[indexPais].nombre;
        liPaises.style.padding = "10px";
        liPaises.style.margin = "10px";
        ulPaises.appendChild(liPaises);
        liPaises.innerText = paises[indexPais].nombre;
        
        //ul
        let ulCiudades = document.createElement("ul");
        liPaises.appendChild(ulCiudades);

        //buttons
        let btnCiudad = document.createElement("button");
        liPaises.insertBefore(btnCiudad, ulCiudades);
        btnCiudad.classList.add("btn-ciudad");
        btnCiudad.innerText = "Agregar Ciudad";

        let btnEdit = document.createElement("button");
        liPaises.insertBefore(btnEdit, btnCiudad)
        btnEdit.innerText = "Edit";
        btnEdit.className = "btn-edit";

        let btnDelete = document.createElement("button");
        liPaises.insertBefore(btnDelete, btnCiudad)
        btnDelete.innerText = "Delete"
        btnDelete.className = "btn-delete";

        btnCiudad.addEventListener('click',()=>{
          inputButtons(liPaises,ulCiudades, endpointCiudades, )
        })

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

function inputButtons(container, container2, endpoint, idRegion,idPais) {
  let inputTXT = document.createElement("input"),
    inputBTN = document.createElement("button");
  container.appendChild(inputTXT);
  container.insertBefore(inputTXT, container2);
  container.insertBefore(inputBTN, container2);
  //inputTXT.id = "input-region";
  inputTXT.type = "text";
  inputBTN.className = "submit-btn";
  inputBTN.type = "submit";
  inputBTN.innerText = "agregar";
  $(inputBTN).click(function () {
    let body = {
      nombre: inputTXT.value,
      id_region: idRegion,
      id_pais: idPais,

    };
    console.log(body);
    apiFetchPOST(endpoint, body).then((data) => {
      console.log("Nice");
    });
  });
}



/*$('#submit-btn').click(function (e) { 
  e.preventDefault();
  console.log('hola');
  
  //let inputValue = document.getElementById('input-region')[0].value;
  
  //apiFetchPOST(endpointRegiones, inputValue, 'POST')
});*/
});
//$('#jstree').jstree();
    
      $('#jstree').on("changed.jstree", function (e, data) {
          //console.log(data.selected);
      });
        
        $('.caret').on('changed.jstree', function(){
           $('#jstree').jstree(true).select_node('ul');
            
        })

