
if (!_isset(load_entity)) { var load_entity = new Array(); }

var tmp = load_entity.length;
load_entity[tmp] = new Array();
load_entity[tmp].ent_name = "link"

function _reloadAjax( array ) {
	if (global_stat["post"] == (array['v']+array['m']))
		return (0);

	global_stat["button"] = false;
	$.post( "index.php", array ).done(function( data ) {	
		$( "body" ).delay( 100 ).fadeTo( 250, 0, function() {
			$( "head" ).html( data.match( /\<head[^>]*\>([^]*)\<\/head/m )[1] );
			$( "body" ).html( data.match( /\<body[^>]*\>([^]*)\<\/body/m )[1] );
			setTimeout(function() {
				window.onload();
			}, 100)
		} );
	});
}

load_entity[tmp].func = function( arg ) {
	var div = new Array();

	div[0] = add_div( arg['id'], '', arg['parent'] );
	div_setOffset( div[0], { 
		"width":"auto", 
		"height":"auto", 
		"*innerHTML":arg['name'],
		"display":"inline-block",
		"MLeft":5,
		"MRight":5,
		"color":rgb(0,100,200),
		"cursor":"pointer",
		"*state":true
	} );
	add_function( div[0], function() {
			if (this.state) {
				_reloadAjax( arg['array'] )
				this.state = false;
			}
	} );
	
	return div;
} 

