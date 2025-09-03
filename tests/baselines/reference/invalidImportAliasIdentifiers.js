//// [tests/cases/conformance/internalModules/importDeclarations/invalidImportAliasIdentifiers.ts] ////

//// [invalidImportAliasIdentifiers.ts]
// none of these should work, since non are actually modules

var V = 12;

import v = V;

class C {
    name: string;
}

import c = C;

enum E {
    Red, Blue
}

import e = E;

interface I {
    id: number;
}

import i = I;


//// [invalidImportAliasIdentifiers.js]
// none of these should work, since non are actually modules
var V = 12;
var v = V;
class C {
    name;
}
var c = C;
var E;
(function (E) {
    E[E["Red"] = 0] = "Red";
    E[E["Blue"] = 1] = "Blue";
})(E || (E = {}));
var e = E;
var i = I;
