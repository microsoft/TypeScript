var a = load('a');
var b = load('b');
var c = load('c');
var abc = a.b(c);

function load2({set = 'hello'}) {
	return load('tt');
}

var loadUse = load2();
