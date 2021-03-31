
const baseURL = `http://localhost:4500`;

let token = sessionStorage.getItem('token');


const apiFetchGET = async (endpoint) => {
  try {
      
      let response = await fetch(baseURL+endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+ token
          }
      });
      response = await response.json();
      return response;
  } catch (e) {
      console.log(e);
      return (e);
  }
}



const apiFetchPOST = async (endpoint, bodyFETCH) => {
    try {
        let response = await fetch(baseURL+endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ token
            },
            body: JSON.stringify(bodyFETCH)
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
        return(e);
    }
}

const apiFetchDELETE = async (endpoint) => {
    try {
        let response = await fetch(baseURL+endpoint, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ token
            },
            
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
        return(e);
    }
}  

const apiFetchUPDATE = async (endpoint, body) => {
    try {
        let response = await fetch(baseURL+endpoint, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ token
            },

            body: JSON.stringify(body)
            
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
        return(e);
    }
}    

 