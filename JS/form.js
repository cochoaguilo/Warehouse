$('#info-form').submit(function (e) { 
    let nombre = document.getElementById('nombre'),
        apellido = document.getElementById('apellido'),
        cargo = document.getElementById('cargo'),
        email = document.getElementById('email'),
        compañia = document.getElementById('compañia');
        
    if (!nombre.value || !apellido.value || !cargo.value ||
        !email.value || !compañia.value) {
        alert('Chequear las entradas')
    } else {
        e.preventDefault();
        $(this).get(0).reset();
    }
    
    
});

