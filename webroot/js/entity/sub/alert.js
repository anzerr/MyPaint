if (!_isset(load_entity)) { var load_entity = new Array(); }

function alert( info, type ) {
	var div = _getbyid( "alert-div" );
	if ( _isset( div ) ) { 
		div.add( info, type ); 
	} else {
		console.log("alert not loaded");
	}
}

var tmp = load_entity.length;
load_entity[tmp] = new Array();
load_entity[tmp].ent_name = "alert"

load_entity[tmp].func = function( arg ) {
	var div = new Array();

	function _a( info, type ) {
		var tmp = div[1].cloneNode(true);
		div[0].appendChild( tmp );
		tmp.className = "alert-"+type;
		var sub = (tmp.children[0]).children;

		tmp.remove = function() { 
			div_setOffset( tmp, { "MTop":(tmp.offsetHeight+1)*-1, "opacity":0, "pointerEvents":"none" } );

			setTimeout(function(){
				if ( _isset( tmp.parentNode ) ) {
					tmp.parentNode.removeChild(tmp);
				};

				/*if ( _isset( global_interval[sub[1].hook].cur ) ) {
					global_interval[sub[1].hook].cur = -1;
				}*/
			}, 1000 );
		};

		$( sub[0] ).hover(
			function() {
				this.color = $( this ).css("color");
				$( this ).css("color", rgb(0, 0, 0));
			}, function() {
				$( this ).css("color", this.color);
			}
		);
		$( sub[0] ).click(function() {
			tmp.remove();
		});

		//sub[1].hook = _addinterval( { "delay":1000/30, "func":function() {
			//if ( _isset( tmp.parentNode ) ) {	
				info( sub[1], 1 );
			//}
		//} } )

		setTimeout(function(){ div_setOffset( tmp, { "opacity":1, "MTop":10 } ); }, 10 );
		
		/*setTimeout(function(){
			tmp.remove();
		}, 1000*10 );*/

		return (tmp);
	}

	div[0] = add_div(  );
		div_setOffset( div[0], { "width":"100%", "height":0, "position":"absolute", "top":10, "left":0, "zIndex":10000000 } );

	div[10] = add_div( '', '', div[0] );
	div_setOffset( div[10], { "height":0, "width":"100%", "pointerEvents":"none", "overflow":"hidden" } );

	div[1] = add_div( "alert-div", '', div[10] );
		div_setOffset( div[1], { "width":"100%", "PBottom":5, "PTop":5, "height":"auto", "MTop":-50, "opacity":0 } );
		div_set_transition( div[1], {"margin-top":'0.5', "opacity":'1'} );

	div[2] = add_div( '', '', div[1] );
		div_setOffset( div[2], { "MRight":60, "MLeft":60, "wordWrap":"break-word" } );

	div[3] = add_div( '', 'no-select', div[2] );
		div_setOffset( div[3], { "MLeft":"auto", "width":20, "height":20, "*innerHTML":"X", "cursor":"pointer" } );

	div[4] = add_div( '', '', div[2] );
		div_setOffset( div[4], { "MRight":20, "MTop":-20, "height":"auto" } );

	div[1].add = function( info, type ) {
		_a( info, type )
	}

	return div;
} 

