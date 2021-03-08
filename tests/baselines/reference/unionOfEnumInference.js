//// [unionOfEnumInference.ts]
// Repro from #42932

enum Enum { A, B, C }

interface Interface<T extends Enum> {
	type: T;
}

function foo<T extends Enum>(x: Interface<T>) { }

function bar(x: Interface<Enum.A | Enum.B> | Interface<Enum.C>) {
	foo(x);
}


//// [unionOfEnumInference.js]
"use strict";
// Repro from #42932
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum[Enum["C"] = 2] = "C";
})(Enum || (Enum = {}));
function foo(x) { }
function bar(x) {
    foo(x);
}
