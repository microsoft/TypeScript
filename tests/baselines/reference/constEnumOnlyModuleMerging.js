//// [tests/cases/compiler/constEnumOnlyModuleMerging.ts] ////

//// [constEnumOnlyModuleMerging.ts]
namespace Outer {
    export var x = 1;
}

namespace Outer {
    export const enum A { X }
}

namespace B {
    import O = Outer;
    var x = O.A.X;
    var y = O.x;
}

//// [constEnumOnlyModuleMerging.js]
var Outer;
(function (Outer) {
    Outer.x = 1;
})(Outer || (Outer = {}));
var B;
(function (B) {
    var O = Outer;
    var x = 0 /* O.A.X */;
    var y = O.x;
})(B || (B = {}));
