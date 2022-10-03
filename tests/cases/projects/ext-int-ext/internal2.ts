module outer {
	import g = require("external2")
	export var a = g.square(5);
	export var b = "foo";
}