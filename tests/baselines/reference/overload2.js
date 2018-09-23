//// [overload2.ts]
enum A { }
enum B { }
    
function foo(a: A);
function foo(b: B);
// should be ok
function foo(x: number) { 
}

class C { }
function foo1(a: A);
function foo1(c: C);
// should be ok
function foo1(x: number) { 
}


//// [overload2.js]
var A = A || (A = {});
(function (A) {
})(A);
var B = B || (B = {});
(function (B) {
})(B);
// should be ok
function foo(x) {
}
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
// should be ok
function foo1(x) {
}
