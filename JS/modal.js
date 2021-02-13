//get modal
$('#ag-contacto').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "block");
});

$('#close-modal').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "none");
});

$('#modal-cancelar').click(function (e) { 
    e.preventDefault();
    $('#myModal').css("display", "none");
});

//upload
$('#upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "block");
});

$('#cancelar-upload').click(function (e) { 
    e.preventDefault();
    $('#modalUpload').css("display", "none");
});