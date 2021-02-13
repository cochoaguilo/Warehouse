const container = document.getElementById('container-table');

const getUsers = async () => {
    const usersList = await fetch(`http://localhost:4500/usuarios`);
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