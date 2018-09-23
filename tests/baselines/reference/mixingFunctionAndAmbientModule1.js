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
var A = A || (A = {});
(function (A) {
    function My(s) { }
})(A);
var B = B || (B = {});
(function (B) {
    function My(s) { }
})(B);
var C = C || (C = {});
(function (C) {
})(C);
var D = D || (D = {});
(function (D) {
})(D);
var E = E || (E = {});
(function (E) {
})(E);
