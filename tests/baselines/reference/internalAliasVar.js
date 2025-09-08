//// [tests/cases/compiler/internalAliasVar.ts] ////

//// [internalAliasVar.ts]
namespace a {
    export var x = 10;
}

namespace c {
    import b = a.x;
    export var bVal = b;
}


//// [internalAliasVar.js]
var a;
(function (a) {
    a.x = 10;
})(a || (a = {}));
var c;
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c || (c = {}));


//// [internalAliasVar.d.ts]
declare namespace a {
    var x: number;
}
declare namespace c {
    var bVal: number;
}
