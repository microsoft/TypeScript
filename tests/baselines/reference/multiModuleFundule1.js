//// [multiModuleFundule1.ts]
function C(x: number) { }

module C {
    export var x = 1;
}
module C {
    export function foo() { }
}

var r = C(2);
var r2 = new C(2); // using void returning function as constructor
var r3 = C.foo();

//// [multiModuleFundule1.js]
function C(x) { }
(function (C) {
    C.x = 1;
})(C || (C = {}));
(function (C) {
    function foo() { }
    C.foo = foo;
})(C || (C = {}));
var r = C(2);
var r2 = new C(2); // using void returning function as constructor
var r3 = C.foo();
