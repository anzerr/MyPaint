if (!_isset(load_entity)) { var load_entity = new Array(); }

var tmp = load_entity.length;
load_entity[tmp] = new Array();
load_entity[tmp].ent_name = "loadbar"

function set_loadingbar( a ) {
	var div = document.getElementById("div_loadbar");
	if ( _isset( div ) ) { 
		div.setload(a);
	} else {
		console.log("loadbar not loaded");
	}
}

load_entity[tmp].func = function( arg ) {
	var div = new Array();

	div[1] = add_div( '', '', arg['parent'] );
		div_setOffset( div[1], { "width":"100%", "height":arg['size'], "position":"absolute", "zIndex":1000000000, "pointerEvents":"none", "cursor":"crosshair" } );

	div[0] = add_div( "div_loadbar", '', div[1] );
	div_setOffset( div[0], { 
		"width":"100%", "height":arg['size'], "BColor":rgb(200,0,0),
		"*state":true, "*load":1, "*cur":(new Date().getTime())
	} );
	div_set_transition( div[0], {"width":"0.5"} );
	$(div[0]).fadeOut(0);

	setInterval(function(){
		if (div[0].cur <= (new Date().getTime()) && div[0].state) {
			div[0].cur = (new Date().getTime())+100;

			if ( div[0].style.width != "100%" ) {
				div_setOffset( div[0], { "*load":div[0].load+1, "width":((div[0].load)/(div[0].load + 19))*100+"%" } );
			} else {
				if (div[0].state) {
					$(div[0]).delay(500).fadeOut(250);
					div[0].state = false;
				}
			}
		}
	}, 1000/30 )

	div[0].setload = function( a ) {
		if (a == 0) {
			div[0].load = 0;
			div[0].style.width = "1%";
			div[0].state = true;
		} else {
			div[0].style.width = "100%";
		}

		$(div[0]).fadeIn(100);
	}
	
	return div;
} 

