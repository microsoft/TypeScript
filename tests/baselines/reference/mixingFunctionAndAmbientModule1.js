//// [mixingFunctionAndAmbientModule1.ts]
module A {
    declare module My {
        export var x: number;
    }
    function My(s: string) { }
}

module B {
    declare module My {
        export var x: number;
    }
    function My(s: boolean);
    function My(s: any) { }
}

module C {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
}

module D {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare function My(s: any);
}


module E {
    declare module My {
        export var x: number;
    }
    declare function My(s: boolean);
    declare module My {
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
