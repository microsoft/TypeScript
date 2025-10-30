//// [tests/cases/compiler/declFileInternalAliases.ts] ////

//// [declFileInternalAliases.ts]
namespace m {
    export class c {
    }
}
namespace m1 {
    import x = m.c;
    export var d = new x(); // emit the type as m.c
}
namespace m2 {
    export import x = m.c;
    export var d = new x(); // emit the type as x
}

//// [declFileInternalAliases.js]
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
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


//// [declFileInternalAliases.d.ts]
declare namespace m {
    class c {
    }
}
declare namespace m1 {
    import x = m.c;
    var d: x;
}
declare namespace m2 {
    export import x = m.c;
    var d: x;
}
