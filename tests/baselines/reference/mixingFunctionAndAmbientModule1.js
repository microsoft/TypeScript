//// [tests/cases/compiler/mixingFunctionAndAmbientModule1.ts] ////

//// [mixingFunctionAndAmbientModule1.ts]
namespace A {
    declare namespace My {
        export var x: number;
    }
    function My(s: string) { }
}

namespace B {
    declare namespace My {
        export var x: number;
    }
    function My(s: boolean);
    function My(s: any) { }
}

namespace C {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
}

namespace D {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare function My(s: any);
}


namespace E {
    declare namespace My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare namespace My {
        export var y: number;
    }
    declare function My(s: any);
}


//// [mixingFunctionAndAmbientModule1.js]
var A;
(function (A) {
    function My(s) { }
})(A || (A = {}));
var B;
(function (B) {
    function My(s) { }
})(B || (B = {}));
var C;
(function (C) {
})(C || (C = {}));
var D;
(function (D) {
})(D || (D = {}));
var E;
(function (E) {
})(E || (E = {}));
