window.onload = function() {
	var core = new Array();
	function _unpix( a ) {
		return ( parseInt(a.split("px")[0]) );
	}

	function dist(x1, y1, x2, y2) {
		return ( Math.sqrt( Math.pow( x2-x1, 2) + Math.pow( y2-y1, 2) ) );
	}

	var zindex = 1;
	function _setbox( a, p, c, t ) {
		function _merge( a, b ) {
				for (var v in a) { b[v] = a[v]; }
				return (b);
		}

		a.drag = new Array();
			a.drag["s"] = false;

		$( c ).on("mousedown", function(e) { 
		 	var p = $( a ).position();
				a.drag["x"] = (e.pageX-p.left); 
				a.drag["y"] = (e.pageY-p.top)
				a.drag["s"] = true;
				a.style.zIndex = (zindex += 1);

			div_set_transition( a, _merge( {"top":"0", "left":"0"}, t ) );
		} );
		$( document ).on("mouseup", function() { 
			if (a.drag["s"]) {
				//a.style.zIndex = 1;
				div_set_transition( a, _merge( {"top":"0.5", "left":"0.5"}, t ) );
			}
			a.drag["s"] = false;
		} );

		$( document ).on("mousemove", function(e) {	
				if (a.drag["s"]) {
					div_setOffset( a, { 
					"top":Math.max( 0, Math.min( p.offsetHeight-10, e.pageY-a.drag["y"])), 
					"left":Math.max( 0, Math.min( p.offsetWidth-a.offsetWidth, e.pageX-a.drag["x"]))
					});
				}
		});	

		var law = p.offsetWidth; var lah = p.offsetHeight;
		$( window ).resize(function() {
			if (law != p.offsetWidth || lah != p.offsetHeight) {
				var w = ( ((law-a.offsetWidth)/2 < _unpix(a.style.left))? true : false );
				var h = ( ((lah-10)/2 < _unpix(a.style.top))? true : false );
				var offw = ( (w)? (p.offsetWidth-a.offsetWidth)-( (law-a.offsetWidth)-_unpix(a.style.left) ) : _unpix(a.style.left) );
				a.style.left = Math.max( 0, Math.min( p.offsetWidth-a.offsetWidth, offw ) );
				var offh = ( (h)? (p.offsetHeight-10)- ( (lah-10)-_unpix(a.style.top) ) : _unpix(a.style.top) );
				a.style.top =	Math.max( 0, Math.min( p.offsetHeight-10, offh ) );
				law = p.offsetWidth; lah = p.offsetHeight;
			}
		});
	} 

	function _window( p, x, y, w, h ) {
		var div = new Array();
		var hidden = true;

		div[0] = add_div( '', '', p );
			div_setOffset( div[0], {
				"width":w, "height":h, "BColor":"blue", 
				"pointerEvents":"all", "position":"absolute", "maxHeight":h,
				"top":x, "left":y, "overflow":"hidden"
			} );
			div_set_transition( div[0], {"max-height":"0.5", "top":"1", "left":"1"} );

		div[1] = add_div( '', '', div[0] );
			div_setOffset( div[1], {"width":div[0].offsetWidth-10, "height":"10", "BColor":"blue", "float":"left"} );

		div[2] = add_div( '', '', div[0] );
			div_setOffset( div[2], {"width":"10", "height":"10", "BColor":"black", "float":"left"} );
			$( div[2] ).on("mousedown", function(e) { 
				div_setOffset( div[0], {"maxHeight":( (hidden = !hidden)?div[0].style.height:10 )} );
				console.log(div[0].style.height);
			} );

		div["content"] = add_div( '', '', div[0] );
			div_setOffset( div["content"], {
				"width":w-2, "height":h-12, "BColor":"efebe7", "M":1, "MTop":11
			} );

		_setbox( div[0], p, div[1], {"max-height":"0.5"} );

		return (div);
	}document.body

	var div = add_div( '', "no-select", '' );
	div_setOffset( div, {"width":"100%", "height":"100%", "cursor":"default", "position":"relative", 
		"backgroundImage":"url('./webroot/img/transparent.png')"
	} );
	createEnt( "loadbar", { "id":'', "parent":div, "size":4 } );

	core[0] = add_div( '', "no-select", div );
	div_setOffset( core[0], {"width":"100%", "height":"100%", "cursor":"crosshair", "float":"left"} );
	core[0].drag = new Array();
		core[0].drag["s"] = false;
		
	$( window ).resize(function() {
		for(var li in layer ) {
			var ct = layer[li][4].getContext('2d');
			var save = ct.getImageData(0, 0, layer[li][4].width, layer[li][4].height);
				layer[li][4].width = core[0].offsetWidth; 
				layer[li][4].height = core[0].offsetHeight;
			ct.putImageData(save, 0, 0);
		}
	});

	$( core[0] ).on("mousedown", function(e) { 
		/*core[0].drag["c"] = layer[activelayer][4].getContext('2d');
		core[0].drag["c"].lineJoin = 'round';
		core[0].drag["c"].lineCap = 'round';
		core[0].lastpos = {'x':-1, 'y':-1}
		core[0].drag["s"] = (layer[activelayer][0].drag["h"]);*/
		tool_func[tool_type].init( core[0], e, layer[activelayer], getCOLOR(), getSIZE() );
	} );

	$( document ).on("mousemove", function(e) {	
			/*if (core[0].drag["s"]) {
				var c = core[0].drag["c"];
				if (core[0].lastpos.x == -1) {
					c.beginPath();
					c.moveTo(e.pageX, e.pageY);
				} else {
   				c.lineTo(e.pageX, e.pageY);
					c.lineWidth = 15;
					c.strokeStyle = rgb(activelayer*50,0,0);
					c.stroke();
				}

				core[0].lastpos = {'x':e.pageX, 'y':e.pageY}
			}*/
			tool_func[tool_type].drag( core[0], e, layer[activelayer], getCOLOR(), getSIZE() );
	});	

	$( document ).on("mouseup", function() { 
		tool_func[tool_type].end( core[0], layer[activelayer] );
	} );
//------------------- paint
	/*core[0] = add_div( '', "no-select", div, "canvas" );
	div_setOffset( core[0], {"width":"100%", "height":"100%", "cursor":"default", "position":"absolute"} );
		core[0].drag = new Array();
			core[0].drag["s"] = false;
			core[0].drag["c"] = core[0].getContext('2d');
			core[0].width = core[0].offsetWidth; 
			core[0].height = core[0].offsetHeight;
			core[0].drag["c"].lineJoin = 'round';
			core[0].drag["c"].lineCap = 'round';
	
			/*core[0].render = function() {
				if (_isset(layer[activelayer]) && _isset(layer[activelayer].paint)) {
					var c = core[0].drag["c"]; var s = (new Date().getTime()); var cal = 0;
					c.clearRect(0, 0, core[0].width, core[0].height);
					for(var vin in layer[activelayer].paint ) {
						for(var vout in layer[activelayer].paint[vin] ) {
							c.beginPath();
								c.rect(vin, vout, 1, 1);
								c.fillStyle = layer[activelayer].paint[vin][vout];
								c.fill();
							c.stroke()
							cal++;
						}
					}
					c.font="30px Arial";
					c.fillText( ((new Date().getTime())-s)+" "+cal,10,50);
				}
			}
			core[0].draw = function(x, y ,s) {
				if (!_isset(layer[activelayer].paint)) {
					layer[activelayer].paint = new Array();
				}
				for(var ix = -1*(s/2); ix <= s/2; ix++) {
					if (!_isset(layer[activelayer].paint[x + ix])) {
						layer[activelayer].paint[x + ix] = new Array();
					}
					for(var iy = -1*(s/2); iy <= s/2; iy++) {
						layer[activelayer].paint[x + ix][y + iy] = rgb(0,0,0);
					}
				}
			}
			core[0].line = function(x0, y0, x1, y1) {
				var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
				var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
				var err = (dx>dy ? dx : -dy)/2;
			 
				while (true) {
					core[0].draw(x0,y0, core[0].drag["si"]);
					if (x0 === x1 && y0 === y1) break;
					var e2 = err;
					if (e2 > -dx) { err -= dy; x0 += sx; }
					if (e2 < dy) { err += dx; y0 += sy; }
				}
			}*/
			/*core[0].render = function() {
				var c = core[0].drag['c']; var s = (new Date().getTime());
				c.clearRect(0, 0, core[0].width, core[0].height);
				for(var vin in layer ) {
					for(var	vout in layer ) {
						if (layer[vout][0].drag["p"] == vin) {
							eval(layer[vout].paint);
						}
					}
				}
				c.font="30px Arial";
				c.fillText( ((new Date().getTime())-s),10,50);
			}

		$( core[0] ).on("mousedown", function(e) { 
			core[0].drag["s"] = true;
			core[0].drag["si"] = 50;
			core[0].lastpos = {'x':e.pageX, 'y':e.pageY}
			core[0].drag["st"] = true;
		});

		$( document ).on("mousemove", function(e) {	
				if (core[0].drag["s"]) {
					/*if (core[0].lastpos.x == -1 || core[0].lastpos.y == -1) {
						core[0].draw(e.pageX, e.pageY, core[0].drag["si"]);
					} else {
						core[0].line(core[0].lastpos.x, core[0].lastpos.y, e.pageX, e.pageY)
					}					
					//core[0].render();
					core[0].lastpos = {'x':e.pageX, 'y':e.pageY}
					if (!_isset(layer[activelayer].paint)) {
						layer[activelayer].paint = new Array();
					}
					if (core[0].drag["st"]) {
						var str = "c.beginPath();c.moveTo("+core[0].lastpos.x+", "+core[0].lastpos.y+");"; core[0].drag["st"] = false;
					} else {
     				var str = "c.lineTo("+e.pageX+", "+e.pageY+");c.lineWidth = 15;c.strokeStyle ='"+rgb(activelayer*50,0,0)+"';c.stroke();";
					}
					layer[activelayer].paint += str;
					core[0].lastpos = {'x':e.pageX, 'y':e.pageY}
					core[0].render();
				}
		});	

		$( document ).on("mouseup", function() { 
			if (core[0].drag["s"]) {
				core[0].render();
			}
			core[0].drag["s"] = false;
		} );

		window.requestAnimFrame = (function(callback) {
      return 	window.requestAnimationFrame || 
							window.webkitRequestAnimationFrame || 
							window.mozRequestAnimationFrame || 
							window.oRequestAnimationFrame || 
							window.msRequestAnimationFrame ||
	  					function(callback) {
	   						window.setTimeout(callback, 1000 / 30);
	  					};
    })();
		function animate() {
			core[0].render();
			requestAnimFrame(function() {
				animate();
			});
		};*/
//------------------
	core[1] = add_div( '', "no-select", div );
	div_setOffset( core[1], {
		"width":"100%", "height":"100%", "cursor":"default", "position":"absolute", 
		"pointerEvents":"none", "overflow":"hidden", "zIndex":100000
	} );
	var box = new Array();

	box[2] = _window( core[1], core[1].offsetHeight-310, core[1].offsetWidth-160, 150, 300 );
		function _layer( p, l, t ) {
			var a = new Array();
			var count = 0;
				for(var li in l )
					count += ( (_isset(l[li])) ? 1 : 0 );

			a[1] = add_div( '', '', p );
				var color = ( (activelayer == t)? rgb(0,255,0) : rgb(200,200,200) )
				div_setOffset( a[1], {"width":"100%", "height":"20", "BColor":rgb(220,220,220), 
					"position":"absolute", "top":(30*count), "borderTop":"solid 1px "+color, "borderBottom":"solid 1px "+color
				} );
				div_set_transition( a[1], {"top":"0.5", "left":"0.5"} );
				layercore[0].style.height = _unpix(layercore[0].style.height)+30;

			a[4] = add_div( '', '', core[0], "canvas" );
				div_setOffset( a[4], {"width":"100%", "height":"100%", "position":"absolute"} );
				a[4].width = core[0].offsetWidth; 
				a[4].height = core[0].offsetHeight;

			a[0] = add_div( '', '', a[1] );
			div_setOffset( a[0], {
				"width":"50%", "height":"20", "BColor":"transparent", 
				"*innerHTML":t, "float":"left", "color":"black", "textAlign":"center"
			} );	
				a[0].drag = new Array();
					a[0].drag["s"] = false;
					a[0].drag["p"] = count;
					a[0].drag["h"] = true;

			a[2] = add_div( '', '', a[1] );
				div_setOffset( a[2], {"width":"20", "height":"20", "background":"url('./webroot/img/oeil.png') 50% 50%", 
					"backgroundSize":"100% 100%", "float":"right"
				} );
				$( a[2] ).click(function() {
					a[0].drag["h"] = !a[0].drag["h"];
					$( a[2] ).fadeTo( 500, ((a[0].drag["h"])?1:0) );
					a[4].style.display = ((a[0].drag["h"])?"block":"none")
				} );

			a[3] = add_div( '', '', a[1] );
				div_setOffset( a[3], {
						"width":"20", "height":"20", "background":"url('./webroot/img/corbeille.png') 50% 50%", "backgroundSize":"200% 150%", 
						"*innerHTML":"D", "float":"right", "display":( (a[0].drag["p"] == 0)? "none" : "block" )
				} );	
				$( a[3] ).click(function() {
						//var last = activelayer;
						for(var li in l ) {
							if (a[0].drag["p"] < l[li][0].drag["p"]) {
								l[li][0].drag["p"] = Math.max(0, Math.min(l.length, l[li][0].drag["p"]-1) );
							}
							//activelayer = ( (a[0].drag["p"]-1 == l[li][0].drag["p"])? li : activelayer );
						}	
						activelayer = -1; while (!_isset( layer[(activelayer++)] )); activelayer += -1;
						//( (activelayer == last && a[0].drag["p"] == last)? 0 : activelayer );
						for(var li in l ) {
							l[li][1].style.top = l[li][0].drag["p"]*30;
							l[li][3].style.display = ( (l[li][0].drag["p"] == 0)? "none" : "block" );
							var color = ( (activelayer == li)? rgb(0,255,0) : rgb(200,200,200) )
							div_setOffset( l[li][1], {"borderTop":"solid 1px "+color, "borderBottom":"solid 1px "+color} ); 
						}
						layercore[0].style.height = _unpix(layercore[0].style.height)-30;
						$( a[1] ).remove(); $( a[4] ).remove();
						layercore[1].drag["o"] = box[2]["content"].offsetHeight/_unpix(layercore[0].style.height);
						layercore[1].style.height = layercore[1].drag["o"]*box[2]["content"].offsetHeight;
						/*div_setOffset( layercore[1], {"top":box[2]["content"].offsetHeight-layercore[1].offsetHeight});*/
						var offset = _unpix(layercore[1].style.top)/(box[2]["content"].offsetHeight-layercore[1].offsetHeight);
						div_set_transition( layercore[0], {"top":"0", "left":"0"} );
						console.log
						div_setOffset( layercore[0], { 
							"MTop":Math.min( 0, ((layercore[0].offsetHeight-box[2]["content"].offsetHeight)*offset)*-1 )
						});
						layercore[1].style.top = Math.floor( ((layercore[2].offsetHeight-layercore[1].offsetHeight)*offset)/2 );
						div_set_transition( layercore[0], {"top":"1", "left":"1"} );
						delete l[t];
				} );

			$( a[0] ).on("mousedown", function(e) { 
			 	var pos = $( a[1] ).position();
					a[0].drag["x"] = (e.pageX-pos.left); 
					a[0].drag["y"] = (e.pageY-pos.top)
					a[0].drag["s"] = true;
				 	a[1].style.zIndex = 10;
					activelayer = t; console.log(activelayer);
					for(var li in l ) {
						var color = ( (activelayer == li)? rgb(0,255,0) : rgb(200,200,200) )
						div_setOffset( l[li][1], {"borderTop":"solid 1px "+color, "borderBottom":"solid 1px "+color} ); 
					} 

				div_set_transition( a[1], {"top":"0", "left":"0"} );
				 $( document ).mousemove();
			} );
			$( document ).on("mouseup", function() { 
				if ( a[0].drag["s"] ) {
					div_set_transition( a[1], {"top":"0.5", "left":"0.5"} );
					var last = a[0].drag["p"];
					a[0].drag["p"] = Math.max(0, Math.min(l.length-1, Math.round( _unpix(a[1].style.top)/30 ) ) );

					if (a[0].drag["p"] != last) {
						for(var li in l ) {
							if (a[0].drag["p"] > last) {
								if (li != t && l[li][0].drag["p"] <= a[0].drag["p"] && l[li][0].drag["p"] >= last) {
									l[li][0].drag["p"] = Math.max(0, Math.min(l.length, l[li][0].drag["p"]-1) );
								}
							} else {
								if (li != t && l[li][0].drag["p"] >= a[0].drag["p"] && l[li][0].drag["p"] <= last) {
									l[li][0].drag["p"] = Math.max(0, Math.min(l.length, l[li][0].drag["p"]+1) );
								}
							}
						}
					}
					for(var li in l ) {
						l[li][1].style.top = l[li][0].drag["p"]*30;
						l[li][3].style.display = ( (l[li][0].drag["p"] == 0)? "none" : "block" );
						l[li][4].style.zIndex = l[li][0].drag["p"]*2;
					}
					a[1].style.zIndex = 1;
				}
				a[0].drag["s"] = false;
			} );

			$( document ).on("mousemove", function(e) {	
					if (a[0].drag["s"]) {
						div_setOffset( a[1], { 
							"top":Math.max( 0, Math.min( p.offsetHeight-20, e.pageY-a[0].drag["y"])), 
						});	
					}
			});	
	
			if (_isset(layercore[1])) {
				if (_isset(layercore[1].drag)) {
					layercore[1].drag["o"] = box[2]["content"].offsetHeight/_unpix(layercore[0].style.height);
					layercore[1].style.height = layercore[1].drag["o"]*box[2]["content"].offsetHeight;
				}
			}
			return (a);
		}
//----------------- layer window content
		div_setOffset( box[2]["content"], {"overflow":"hidden", "height":"90%"} );
		var layer = new Array(); var activelayer = 0;
		var layer_count = 0;
		var layercore = new Array();
			layercore[0] = add_div( '', '', box[2]["content"] );
				div_setOffset( layercore[0], {"width":"89%", "BColor":"transparent", "position":"relative", "MTop":0, "height":0, "float":"left"} );
				div_set_transition( layercore[0], {"margin-top":"1", "width":"1", "height":"1"} );

		for (var i=0; i<=0; i++) {
			layer[layer_count] = _layer( layercore[0], layer, (layer_count++) );
		}

		layercore[2] = add_div( '', '', box[2]["content"] );
			div_setOffset( layercore[2], {"width":"10%", "height":"100%","BColor":"transparent", "position":"relative", "MTop":0, "float":"right"} );

		layercore[1] = add_div( '', '', layercore[2] );
			div_setOffset( layercore[1], {"width":"100%", "height":0,"BColor":rgb(150,150,200), "position":"absolute"} );
			div_set_transition( layercore[1], {"height":"0.5"} );
			layercore[1].drag = new Array();
			layercore[1].drag["s"] = false;
			layercore[1].drag["o"] = box[2]["content"].offsetHeight/_unpix(layercore[0].style.height);
			layercore[1].style.height = layercore[1].drag["o"]*box[2]["content"].offsetHeight;

		layercore[4] = add_div( '', '', box[2][0] );
			div_setOffset( layercore[4], {
				"width":"calc(100% - 2px)", "height":"calc(10% - 14px)", "*innerHTML":"add layer", "color":"black", "border":"solid 1px blue",
				"BColor":rgb(200,200,200), "position":"relative", "top":0, "textAlign":"center"
			} );
			$( layercore[4] ).click( function() {
				layer[layer_count] = _layer( layercore[0], layer, (layer_count++) );
			} );

		$( layercore[1] ).on("mousedown", function(e) { 
		 	var p = $( layercore[1] ).position();
				layercore[1].drag["y"] = (e.pageY-p.top)
				layercore[1].drag["s"] = true;
		} );
		$( document ).on("mouseup", function() { 
			if (layercore[1].drag["s"]) {
				//none
			}
			layercore[1].drag["s"] = false;
		} );

		$( document ).on("mousemove", function(e) {	
				if (layercore[1].drag["s"]) {
					div_setOffset( layercore[1], { 
						"top":Math.max( 0, Math.min( 
							box[2]["content"].offsetHeight-layercore[1].offsetHeight, 
						e.pageY-layercore[1].drag["y"]))
					});
					var offset = _unpix(layercore[1].style.top)/(box[2]["content"].offsetHeight-layercore[1].offsetHeight);
					div_set_transition( layercore[0], {"top":"0", "left":"0"} );
					div_setOffset( layercore[0], { 
						"MTop":((layercore[0].offsetHeight-box[2]["content"].offsetHeight)*offset)*-1
					});
					div_set_transition( layercore[0], {"top":"1", "left":"1"} );
				}
		});
//------------------ option gui
box[1] = _window( core[1], 10, core[1].offsetWidth-210, 200, 200 );
	box[1].sub = new Array();

	box[1].sub[0] = add_div( '', '', box[1]["content"] );
	div_setOffset( box[1].sub[0], {"float":"left", "M":10, "PRight":20} );
		var func_1 = function(a) {
			var div = add_div( '', '', box[1].sub[0] );
			div_setOffset( div, { "color":rgb(0,0,0), "float":"left", "*innerHTML":a, "height":24, "lineHeight":"24px"} );
		}
		var func_2 = function(a) {
			var div = add_div( '', '', box[1].sub[0], "input" );
			div_setOffset( div, {"width":"25", "float":"left", "border":"0px", "*maxLength":3,
				"BColor":"transparent", "*placeholder":0, "textAlign":"center", "color":a
			} );
			return(div);
		}
			func_1("rgb(");
		box[1].sub[1] = func_2( rgb(255, 0, 0) );
			func_1(",");
		box[1].sub[2] = func_2( rgb(0, 255, 0) );
			func_1(",");
		box[1].sub[3] = func_2( rgb(0, 0, 255) );
			func_1(")");
		$( box[1].sub[1] ).on('input',function() { box[1].sub[0].style.borderRight = "solid 20px "+getCOLOR() });
		$( box[1].sub[2] ).on('input',function() { box[1].sub[0].style.borderRight = "solid 20px "+getCOLOR() });
		$( box[1].sub[3] ).on('input',function() { box[1].sub[0].style.borderRight = "solid 20px "+getCOLOR() });
		box[1].sub[0].style.borderRight = "solid 20px "+getCOLOR()

	box[1].sub[4] = add_div( '', '', box[1]["content"] );
	div_setOffset( box[1].sub[4], {"float":"left", "M":10, "width":"100%"} );

		var div = add_div( '', '', box[1].sub[4] );
		div_setOffset( div, { "color":rgb(0,0,0), "float":"left", "*innerHTML":"size", "height":24, "lineHeight":"24px"} );

		box[1].sub[5] = add_div( '', '', box[1].sub[4], "input" );
		div_setOffset( box[1].sub[5], {"float":"left", "width":"40", "MLeft":10, "border":"0px", "*value":10} );

	box[1].sub[6] = add_div( '', '', box[1]["content"] );
	div_setOffset( box[1].sub[6], {"float":"left", "M":10, "width":"calc(100% - 20px)"} );

		var div = add_div( '', '', box[1].sub[6] );
		div_setOffset( div, { "color":rgb(255,0,0), "float":"left", "*innerHTML":"WARNING: may lose brain cells (NO CLICK)", "lineHeight":"24px"} );

		var div = add_div( '', '', box[1].sub[6] );
		div_setOffset( div, { "color":rgb(0,0,0), "float":"left", "*innerHTML":"Mentally challenged MOD", "fontSize":"12px", "height":24, "lineHeight":"24px"} );

		box[1].sub[7] = add_div( '', '', box[1].sub[6], "input" );
		div_setOffset( box[1].sub[7], {"float":"left", "MLeft":5, "border":"0px", "*checked":false, "*type":"checkbox"} );


	function getCOLOR() {
		var r = Math.max( 0, Math.min( 255, box[1].sub[1].value ) );
		var g = Math.max( 0, Math.min( 255, box[1].sub[2].value ) );
		var b = Math.max( 0, Math.min( 255, box[1].sub[3].value ) );
		return rgb(r, g, b);
	}

	function getSIZE() {
		return ( box[1].sub[5].value );
	}

	function noBRAIN() {
		return ( box[1].sub[7].checked );
	}
//------------------ tool gui
box[0] = _window( core[1], 10, 10, 75, 500 );
	box[0].sub = new Array();
	box[0].sub[0] = add_div( '', '', box[0]["content"] );
	div_setOffset( box[0].sub[0], {"width":"100%", "height":"100%", "BColor":"efebe7" } );
		var func_1 = function(a, b) {
			
			var div = add_div( '', '', box[0].sub[0] );
			div_setOffset( div, {"width":25, "height":25, "M":5, "float":"left",
				"background":"url('./webroot/img/"+a+".png')", "backgroundSize":"100% 100%"
			} );
			div.act = function() {
				for (var i in tool_button) {
					tool_button[i].style.boxShadow = "green 0 0px 0 0";
				}
				div.style.boxShadow = "blue 1px 1px 1px 1px";
			}

			$( div ).click( b ); $( div ).click( div.act );
			return (div);
		}
		var tool_button = new Array();

		tool_button[0] = func_1( "brush", function() { tool_type = 0; core[0].drag["s"] = false; } );
		tool_button[1] =func_1( "circle", function() { tool_type = 1; core[0].drag["s"] = false; } );
		tool_button[2] =func_1( "box", function() { tool_type = 2; core[0].drag["s"] = false; } );
		tool_button[3] =func_1( "eraser", function() { tool_type = 3; core[0].drag["s"] = false; } );
		tool_button[4] =func_1( "line", function() { tool_type = 4; core[0].drag["s"] = false; } );
		tool_button[5] =func_1( "spray", function() { tool_type = 5; core[0].drag["s"] = false; } );
		tool_button[6] =func_1( "pick", function() { tool_type = 6; core[0].drag["s"] = false; });
		tool_button[7] =func_1( "save", function() { tool_func[7].init(); } );

//------------------ tool funcion
	 //animate();
	var tool_func = new Array(); var tool_type = 0;
	tool_func[0] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.drag["c"].lineJoin = 'round';
			c.drag["c"].lineCap = 'round';
			c.drag["s"] = (layer[0].drag["h"]);
			var ct = c.drag["c"];
			ct.beginPath();
			ct.moveTo(hook.pageX, hook.pageY);
			ct.lineTo(hook.pageX+1, hook.pageY+1);
			ct.lineWidth = size;
			ct.strokeStyle = color;
			ct.stroke();
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
 				ct.lineTo(hook.pageX, hook.pageY);
				ct.stroke();
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}	
			c.drag["s"] = false;
		}
	}

	tool_func[1] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.lastpos = {'x':hook.pageX, 'y':hook.pageY}
			c.drag["s"] = ((c.drag["s"] && noBRAIN()) ? !c.drag["s"] : layer[0].drag["h"] );
			c.drag["save"] = c.drag["c"].getImageData(0, 0, layer[4].width, layer[4].height);
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
				ct.clearRect(0, 0, layer[4].width, layer[4].height);
				ct.putImageData(c.drag["save"], 0, 0);
				ct.fillRect(c.lastpos.x, c.lastpos.y, hook.pageX-c.lastpos.x, hook.pageY-c.lastpos.y);
				ct.fillStyle = color;
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}
			c.drag["s"] = ( (noBRAIN()) ? c.drag["s"] : false );
		}
	}

	tool_func[2] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.lastpos = {'x':hook.pageX, 'y':hook.pageY}
			c.drag["s"] = ((c.drag["s"] && noBRAIN()) ? !c.drag["s"] : layer[0].drag["h"] );
			c.drag["save"] = c.drag["c"].getImageData(0, 0, layer[4].width, layer[4].height);
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
				ct.clearRect(0, 0, layer[4].width, layer[4].height);
				ct.putImageData(c.drag["save"], 0, 0);
				ct.beginPath();
				ct.arc(c.lastpos.x, c.lastpos.y, dist(hook.pageX, hook.pageY, c.lastpos.x, c.lastpos.y), 0, 2*Math.PI, false);
		    ct.fillStyle = color;
		    ct.fill();
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}
			c.drag["s"] = ( (noBRAIN()) ? c.drag["s"] : false );
		}
	}

	tool_func[3] = {
		init : function( c, hook, layer, color, size ) {	
			c.drag["c"] = layer[4].getContext('2d');
			c.drag["c"].lineJoin = 'round';
			c.drag["c"].lineCap = 'round';
			c.drag["s"] = (layer[0].drag["h"]);
			var ct = c.drag["c"];
			ct.beginPath();
			ct.globalCompositeOperation = 'destination-out';
			ct.moveTo(hook.pageX, hook.pageY);
			ct.lineTo(hook.pageX+1, hook.pageY+1);
			ct.lineWidth = size;
			ct.strokeStyle = color;
			ct.stroke();
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
 				ct.lineTo(hook.pageX, hook.pageY);
				ct.stroke();
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
				ct.globalCompositeOperation = 'source-over';
				console.log("end");//none
			}
			c.drag["s"] = false;
		}
	}

	tool_func[4] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.drag["c"].lineJoin = 'round';
			c.drag["c"].lineCap = 'round';
			c.lastpos = {'x':hook.pageX, 'y':hook.pageY}
			c.drag["s"] = ((c.drag["s"] && noBRAIN()) ? !c.drag["s"] : layer[0].drag["h"] );
			c.drag["save"] = c.drag["c"].getImageData(0, 0, layer[4].width, layer[4].height);
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
				ct.clearRect(0, 0, layer[4].width, layer[4].height);
				ct.putImageData(c.drag["save"], 0, 0);

				ct.beginPath();
				ct.moveTo(c.lastpos.x, c.lastpos.y);
 				ct.lineTo(hook.pageX, hook.pageY);
				ct.lineWidth = size;
				ct.strokeStyle = color;
				ct.stroke();
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}
			c.drag["s"] = ( (noBRAIN()) ? c.drag["s"] : false );
		}
	}

	tool_func[5] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.lastpos = {'x':hook.pageX, 'y':hook.pageY}
			c.drag["s"] = (layer[0].drag["h"]);	
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var angle = 0; var ct = c.drag["c"];
				while ((angle += (5/size)) < 2 * Math.PI) {
						var length = Math.random()*size;
						ct.beginPath();
							ct.fillRect(length*Math.cos(angle) + hook.pageX, length*Math.sin(angle) + hook.pageY, 2, 2);
							ct.fillStyle = color;
						ct.fill();
				}
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}
			c.drag["s"] = false;
		}
	}

	tool_func[6] = {
		init : function( c, hook, layer, color, size ) {
			c.drag["c"] = layer[4].getContext('2d');
			c.lastpos = {'x':hook.pageX, 'y':hook.pageY}
			c.drag["s"] = (layer[0].drag["h"]);	
		},
		drag : function( c, hook, layer, color, size ) {
			if (c.drag["s"]) {
				var ct = c.drag["c"];
				var p = ct.getImageData(hook.pageX, hook.pageY, 1, 1).data; 
				for (var i in p) {
					if (parseInt(i) < 3) {
						box[1].sub[parseInt(i)+1].value = p[i];			
					}
				}
				box[1].sub[0].style.borderRight = "solid 20px "+getCOLOR()
			}
		},
		end : function(c) {
			if (c.drag["s"]) {
				console.log("end");//none
			}
			c.drag["s"] = false;
		}
	}

	tool_func[7] = {
		init : function( c, hook, lay, color, size ) {
			set_loadingbar( 0 );
			var save = -1; var backup = 0;
			for(var li in layer ) {
				if (save == -1) {
					save = li;
					var ct = layer[li][4].getContext('2d');
					backup = ct.getImageData(0, 0, layer[li][4].width, layer[li][4].height)
				} 
				var ct = layer[save][4].getContext('2d');
				ct.drawImage(layer[li][4], 0, 0);
			}
			var url = (layer[save][4].toDataURL()).replace(/^data:image\/[^;]/, 'data:application/octet-stream');
			window.location.href = url;
			
			ct.clearRect(0, 0, layer[save][4].width, layer[save][4].height);
			layer[save][4].getContext('2d').putImageData(backup, 0, 0);
			set_loadingbar( 1 );
		},
		drag : function( c, hook, layer, color, size ) {
			//none
		},
		end : function(c) {
			//none
		}
	}

}
