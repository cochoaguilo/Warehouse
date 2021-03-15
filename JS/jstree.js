/*$('#jstree').jstree({
	'core' : {
		'data' : function (obj, callback) {
			callback.call(this, ['Root 1', 'Root 2']);
		}
	}
});*/
/*$('#jstree').jstree({
	'core' : {
		'data' : [
			'Simple root node',
			{
				'id' : 'node_2',
				'text' : 'Root node with options',
				'state' : { 'opened' : true, 'selected' : true },
				'children' : [ { 'text' : 'Child 1' }, 'Child 2']
			}
		]
	}
});*/
  
    $('#jstree').on("changed.jstree", function (e, data) {
        //console.log(data.selected);
    });
      
      $('.caret').on('changed.jstree', function(){
         $('#jstree').jstree(true).select_node('ul');
          
      })