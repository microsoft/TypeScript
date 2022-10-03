//// [genericFunduleInModule2.ts]
module A {
    export function B<T>(x: T) { return x; }
}

module A {
    export module B {
        export var x = 1;
    }
}

var b: A.B;
A.B(1);

//// [genericFunduleInModule2.js]
var A;
(function (A) {
    function B(x) { return x; }
    A.B = B;
})(A || (A = {}));
(function (A) {
    var B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
A.B(1);
