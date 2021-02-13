
$(document).ready(function(){
   
   
      // 8 interact with the tree - either way is OK
      $('#jstree').jstree();
    
      $('#jstree').on("changed.jstree", function (e, data) {
          //console.log(data.selected);
          
        });
       // $('#contactos').on('click', function () {
         //   $('#jstree').jstree(true).select_node('ul');
          
          //});
        $('.caret').on('changed.jstree', function(){
            //$('#jstree').jstree(true).select_node('ul');
            
        })



})
