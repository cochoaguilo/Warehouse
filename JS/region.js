const endpointRegiones = `http://localhost:4500/regiones`;
const container = document.getElementById('jstree');

const getRegiones = async () => {
    const usersList = await fetch(endpointRegiones);
    const usersjson = await usersList.json();
    console.log(usersjson);
    fillRegion(usersjson)
  };

  const fillRegion = (list)=>{
      list.map(region =>{
          const regiones = region.nombre_region;
          container.innerHTML += 
    `<ul>
        <li>${regiones}<li>
      <ul>  
    `
      })
  }

getRegiones();

$('#ag-reg').click(function (e) { 
  e.preventDefault();
  var input  = document.createElement('input');
  container.appendChild(input);
  return input;
});

const postRegion = async()=>{
  const config = {
    method: 'POST',
    body: input.value
  }
  await fetch(endpointRegiones, config);
  

}