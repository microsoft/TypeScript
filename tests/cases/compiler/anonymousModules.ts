module {
	export var foo = 1;

	module {
		export var bar = 1;
	}

	var bar = 2;

	module {
		var x = bar;
	}
}