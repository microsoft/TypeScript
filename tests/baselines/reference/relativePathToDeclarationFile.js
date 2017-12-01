//// [tests/cases/conformance/externalModules/relativePathToDeclarationFile.ts] ////

//// [foo.d.ts]
export declare module M2 {
	export var x: boolean;
}

//// [other.d.ts]
export declare module M2 {
	export var x: string;
}

//// [relMod.d.ts]
declare class Test {
	constructor(x: number);
}
export = Test;

//// [file1.ts]
import foo = require('foo');
import other = require('./other');
import relMod = require('./sub/relMod');

if(foo.M2.x){
	var x = new relMod(other.M2.x.charCodeAt(0));
}


//// [file1.js]
"use strict";
exports.__esModule = true;
var foo = require("foo");
var other = require("./other");
var relMod = require("./sub/relMod");
if (foo.M2.x) {
    var x = new relMod(other.M2.x.charCodeAt(0));
}
