
if (!_isset(load_entity)) { var load_entity = new Array(); }

var tmp = load_entity.length;
load_entity[tmp] = new Array();
load_entity[tmp].ent_name = "interval"

var global_interval = new Array();
function _addinterval( array ) {
	var a = global_interval.length;
	global_interval[a] =  new Array();
	global_interval[a].delay = array['delay'];
	global_interval[a].cur = 0;
	global_interval[a].func = array['func'];

	return (a);
}

load_entity[tmp].func = function( arg ) {

	var hook = setInterval( function() {	
		for ( var key in global_interval ) {
			if (global_interval[key].cur <= (new Date().getTime()) && global_interval[key].cur != -1) {
				global_interval[key].cur = (new Date().getTime())+global_interval[key].delay;

				global_interval[key].func();
			}
		}
	}, 1000/60 )
	
	return hook;
} 

