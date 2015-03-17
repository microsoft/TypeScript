//// [constEnumOnlyModuleMerging.ts]
module Outer {
    export var x = 1;
}

module Outer {
    export const enum A { X }
}

module B {
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
    var x = 0 /* X */;
    var y = O.x;
})(B || (B = {}));
