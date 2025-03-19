//// [tests/cases/compiler/declFileInternalAliases.ts] ////

//// [declFileInternalAliases.ts]
module m {
    export class c {
    }
}
module m1 {
    import x = m.c;
    export var d = new x(); // emit the type as m.c
}
module m2 {
    export import x = m.c;
    export var d = new x(); // emit the type as x
}

//// [declFileInternalAliases.js]
var m;
(function (m) {
    class c {
    }
    m.c = c;
})(m || (m = {}));
var m1;
(function (m1) {
    var x = m.c;
    m1.d = new x(); // emit the type as m.c
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.x = m.c;
    m2.d = new m2.x(); // emit the type as x
})(m2 || (m2 = {}));
