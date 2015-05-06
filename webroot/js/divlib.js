
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function strlen( b ) {		
	return Math.max( 0, (b+' ').split("").length-1 ); 
}

function _getbyid( a ) {
	return document.getElementById( a );
}

function upperChar( str ) {
	return str.charAt(0).toUpperCase()+str.slice(1);
}

function rgb(red, green, blue) {
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function existsByID( id ) {
	var element = document.getElementById( id );
	if (typeof(element) != 'undefined' && element != null) {
		return true;
	}
	return false;
}
function _get_multitag( a, b ) {
	var c = new Array();
	for( var key in b ) {
		var buffer = Array.prototype.slice.call( a.getElementsByTagName( key ) );
		c = c.concat( buffer );
	}
	return c;
}

function _isset( a ) {
	if (typeof(a) != 'undefined' && a != null) { 
		return true;
	}
	return false;
}

function _rstring(s) {
    var a = ''; var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < (_isset(s)?s:1); i++ )
       a += b.charAt( Math.floor(Math.random()*b.length) );
    return (a);
}

function add_div( id, style, parent, type ) {
	parent = ( (_isset(parent))?parent:0 )
	type = ( (_isset(type))?type:"div" )

	var tmp = document.createElement(type);
	if (_isset(id)) { tmp.id = id; }
	if (_isset(style)) { tmp.className = style; }
	tmp.style.display = "block";

	var id_parent = document.body;
	if( parent != 0 ){
		id_parent = ( (typeof(parent) == "object") ? parent : document.getElementById(parent) );
	}
	id_parent.appendChild( tmp );

	return tmp;
}

function div_set_transition( id, array ) {
	var div = ( (typeof(id) == "object")  ? id : document.getElementById(id) );

	var var_max = 0;
	var count = 0;
	var array_lenth = 0;
	var a = "";
	
	if (_isset(div)) {
		for ( var key in array ) {
		 	if (key === 'length' || !array.hasOwnProperty(key)) continue;
			array_lenth++;
		}

		for ( var key in array ) {
		 	if (key === 'length' || !array.hasOwnProperty(key)) continue;
			count += 1;
			a += key+" "+array[key]+"s"+((count!=array_lenth)?", ":"");
			if (var_max <= array[key]) {
				var_max = array[key];
			}
		}

		console.log(a);
		div_setOffset( div, {"WebkitTransition":a, "MozTransition":a, "transition":a, "*delay":var_max*1000} );
		return true;
	}
	return false;
}

function div_setOffset( id, a ) {
	var div = ( (typeof(id) == "object")  ? id : document.getElementById(id) );
	var type = { 'M':"margin", 'P':"padding", 'B':"background", "S":"border" }
	var dub = { "float":"cssFloat" }
	var px = { "maxHeight":1 }

	if (_isset(div)) {
		for( var key in a ) {
			var tmp = ''; var offset = ( (key.charAt(0) == "*") ? 1 : 0 );
			if ( _isset(type[key.charAt(offset)]) ) { tmp += type[key.charAt(offset)]; }
			tmp += ( (strlen(tmp)!=0) ? key.slice(offset+1) : key.slice(offset) );

			if (offset == 0) { 
				if ( _isset(dub[tmp]) ) { div.style[dub[tmp]] = a[key]; }
				div.style[tmp] = ( (_isset(px[tmp])) ? replaceAll("pxpx", "px", a[key]+"px") : a[key] ); 
			} else {
				div[tmp] = a[key];
			}
		}
		return true;
	}
	return false;
}

function add_function( id, tmp_func ) {
	var div = ( (typeof(id) == "object")  ? id : document.getElementById(id) );

	if (_isset(div)) {
		div.func = tmp_func;
		div.onclick = div.func;
		return true;
	}
	return false;
}

