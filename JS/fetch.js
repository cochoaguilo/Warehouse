const container = document.getElementById('container-table');
const endpointUsuarios = `http://localhost:4500/usuarios`;


const getUsers = async () => {
    const usersList = await fetch(endpointUsuarios);
    const usersjson = await usersList.json();
    console.log(usersjson);
    fillUsersInfo(usersjson);
  };

const fillUsersInfo = (userList) => {
   /* usersListHTML.innerHTML += `<tr>
      <th>Firstname</th>
      <th>Lastname</th> 
      <th>Email</th>
    </tr>`;*/
    userList.map(user => {
      const contacto = user.Contacto;
      const pais = user.Pais;
      const compañia = user.Compañia;
      const cargo = user.Cargo;
      const canal = user.Canal;
      const interes = user.Interes;
      container.innerHTML += `
      <tr>
        <td>${contacto}</td>
        <td>${pais}</td>
        <td>${compañia}</td>
        <td>${cargo}</td>
        <td>${canal}</td>
        <td>${interes}</td>
      </tr>`;
    });
  };

  getUsers();

  const postUser = async(body) =>{
   
      const config = {
        method: 'POST',
        mode: 'cors',
        body: body
      }
      try{
        const newUser = await fetch(endpointUsuarios, config);
        const data = await newUser.json();
        console.log(data);
      }catch(e){
        console.log(e);
      }
  };

  

  $('.modal-form').submit(function (e) { 
    e.preventDefault();

    const formData = new FormData(this);
    postUser(formData);
  });

  