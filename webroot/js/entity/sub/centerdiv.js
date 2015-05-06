
if (!_isset(load_entity)) { var load_entity = new Array(); }

var tmp = load_entity.length;
load_entity[tmp] = new Array();
load_entity[tmp].ent_name = "centerdiv"

load_entity[tmp].func = function( arg ) {
	var div = new Array();
	div[0] = add_div( '', '', arg['parent'] );
	div_setOffset( div[0], {"BColor":"transparent", "width":arg['x'], "height":"auto" } );

	div[1] = add_div( '', '', div[0] );
	div_setOffset( div[1], { "BColor":"transparent", "M":"0 auto", "width":arg['xa'], "height":"auto" } );

	return div;
} 
