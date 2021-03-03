
const baseURL = `http://localhost:4500`;


const apiFetchGET = async (endpoint) => {
  try {
      let response = await fetch(baseURL+endpoint);
      response = await response.json();
      return response;
  } catch (e) {
      console.log(e);
      return (e);
  }
}



const apiFetchPOST = async (endpoint, body) => {
    try {
        let response = await fetch(baseURL+endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

  

  

  