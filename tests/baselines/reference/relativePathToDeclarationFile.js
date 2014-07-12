//// [file1.ts]
import foo = require('foo');
import other = require('./other');
import relMod = require('./sub/relMod');

if(foo.M2.x){
	var x = new relMod(other.M2.x.charCodeAt(0));
}


//// [file1.js]
var foo = require('foo');
var other = require('./other');
var relMod = require('./sub/relMod');

if (foo.M2.x) {
    var x = new relMod(other.M2.x.charCodeAt(0));
}
