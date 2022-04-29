export module outer {
	export module inner {
		var local = 1;
		export var a = local;
	}
}