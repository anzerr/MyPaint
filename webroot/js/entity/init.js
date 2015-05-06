
function createEnt( type, array ) {
	if (_isset(load_entity)) {
		for(var i in load_entity ) {
			if (load_entity[i].ent_name == type)
				return ( load_entity[i].func(array) );
		}
	}	
}

