//// [tests/cases/compiler/functionCall7.ts] ////

//// [functionCall7.ts]
module m1 { export class c1 { public a; }}
function foo(a:m1.c1){ a.a = 1; }; 
var myC = new m1.c1(); 
foo(myC); 
foo(myC, myC); 
foo(4);
foo();


//// [functionCall7.js]
var m1;
(function (m1) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    m1.c1 = c1;
})(m1 || (m1 = {}));
function foo(a) { a.a = 1; }
;
var myC = new m1.c1();
foo(myC);
foo(myC, myC);
foo(4);
foo();
