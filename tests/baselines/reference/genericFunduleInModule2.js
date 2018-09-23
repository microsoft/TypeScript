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
var A = A || (A = {});
(function (A) {
    function B(x) { return x; }
    A.B = B;
})(A);
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        B.x = 1;
    })(B);
})(A);
var b;
A.B(1);
