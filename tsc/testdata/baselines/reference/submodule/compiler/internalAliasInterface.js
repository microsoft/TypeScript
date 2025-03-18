//// [tests/cases/compiler/internalAliasInterface.ts] ////

//// [internalAliasInterface.ts]
module a {
    export interface I {
    }
}

module c {
    import b = a.I;
    export var x: b;
}


//// [internalAliasInterface.js]
var c;
(function (c) {
    var b = a.I;
})(c || (c = {}));
