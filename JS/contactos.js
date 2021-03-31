let contactosEndpoint = "/contactos",
  regionesEndpoint = "/regiones",
  paisesEndpont = "/paises",
  ciudadesEndponint = "/ciudades",
  configEndpoint = "/configuraciones";

let selectRegion = document.getElementById("region"),
    selectPais = document.getElementById("pais"),
    selectCiudad = document.getElementById("ciudad");

let arrayContactos = [];

let table = $("#container-table").DataTable({
  dom: "lBfrtip",
  buttons: ["excel", "pdf"],
});

apiFetchGET(contactosEndpoint)
  .then((data) => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      //array que utilizo para luego editar los contactos
      arrayContactos.push({
        nombre: data[index].nombre,
        apellido: data[index].apellido,
        correo: data[index].correo,
        region: data[index].region,
        pais: data[index].pais,
        id:data[index].id_contacto
      });
      //btn edit
      let divButtons = document.createElement("div");
      let btn = document.createElement("button");
      btn.className = "btn-edit";
      let i = document.createElement("i");
      i.className = "fa fa-edit";
      btn.appendChild(i);

      //btn delete
      let btnDelete = document.createElement("button");
      btnDelete.className = "btn-delete";
      let iDelete = document.createElement("i");
      iDelete.className = "fa fa-trash";
      btnDelete.appendChild(iDelete);

      //btn unidos
      divButtons.appendChild(btn);
      divButtons.appendChild(btnDelete);

      //container para el color del interes
      let divContainerInteres = document.createElement("div");
      divContainerInteres.className = "container-interes";
      let divColor = document.createElement("div");
      divContainerInteres.appendChild(divColor);

      if (data[index].valor == 100) {
        divColor.classList.add("color-interes-100");
      } else if (data[index].valor == 75) {
        divColor.classList.add("color-interes-75");
      } else if (data[index].valor == 50) {
        divColor.classList.add("color-interes-50");
      } else if (data[index].valor == 25) {
        divColor.classList.add("color-interes-25");
      } else {
        return;
      }

      //formato país/region
      let divTxtPais = document.createElement("div");
      let hPais = document.createElement("h5");
      hPais.textContent = data[index].nombre_pais;
      hPais.style.margin = "0";
      var hRegion = document.createElement("h6");
      hRegion.textContent = data[index].nombre_region;
      hRegion.style.margin = "0";
      divTxtPais.append(hPais, hRegion);

      //formato nombre contacto
      let divTxtContacto = document.createElement("div");
      let hContacto = document.createElement("p");
      hContacto.textContent = data[index].nombre + " " + data[index].apellido;
      hContacto.style.margin = "0";
      let hMail = document.createElement("p");
      hMail.textContent = data[index].correo;
      hMail.style.margin = "0";
      hMail.style.fontSize = "14px";
      hMail.style.color = "gray";
      divTxtContacto.append(hContacto, hMail);

      //formato canal preferido
      let pCanalPreferido = document.createElement("p");
      pCanalPreferido.textContent = data[index].canal;
      pCanalPreferido.className = "canal";

      //agrego cada fila
      table.row
        .add([
          divTxtContacto.outerHTML,
          divTxtPais.outerHTML,
          data[index].nombre_compania,
          data[index].cargo,
          pCanalPreferido.outerHTML,
          data[index].valor + "%" + divContainerInteres.outerHTML,
          divButtons.outerHTML,
        ])
        .draw(false);
    }
  })
  .catch((e) => console.log(e));

console.log(arrayContactos);


 

$('#exportar').click(function () { 
  
  $('.dt-buttons').toggle();
});